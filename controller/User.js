const mongoose = require("mongoose");
const User = require("../model/User");
const volunteer = require("../model/volunteer");
const Login = require("../model/login");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

const image_Upload_USER = async (image) => {
  try {
    // Base64-encoded image data
    const base64Image = image; // Replace with your actual base64 image data
    console.log("image", base64Image);

    const customPublicId = "user_image_" + Date.now(); // Example: user_image_1626012345678

    // Upload the base64 image to Cloudinary using a promise
    const result = await cloudinary.v2.uploader.upload(
      `data:image/jpeg;base64,${base64Image}`,
      {
        resource_type: "image",
        folder: "User_images",
        public_id: customPublicId,
      }
    );

    console.log("Image uploaded successfully");
    console.log("Public URL:", result.secure_url);
    console.log("Cloudinary ID:", result.public_id);

    return result;
  } catch (error) {
    console.error("Failed to upload image:", error);
    return { err: "image upload failed in user_Upload" };
  }
};

const signup = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phoneno,
    lattitude,
    longitude,
    image,
    password,
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).json("Signing up failed, please try again later.");
  }

  if (existingUser) {
    return res.status(401).send("User already exists");
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "could not create user , please try again" });
  }
  const image_URL = await image_Upload_USER(image);

  const createdUser = await new User({
    firstname,
    lastname,
    email,
    phoneno,
    lattitude,
    longitude,
    image: image_URL.secure_url,
    password: hashedPassword,
    image_cloudinary_id: image_URL.public_id,
  });

  const loginUser = new Login({
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
    await loginUser.save();
  } catch (err) {
    return res.status(500).json("Signing up failed, please try again later.");
  }

  res.status(201).json({
    data: createdUser,
  });
};

const image_Upload_VOLUNTEER = async (image) => {
  try {
    // Base64-encoded image data
    const base64Image = image; // Replace with your actual base64 image data
    console.log("image", base64Image);

    const customPublicId = "Volunteer_image_" + Date.now(); // Example: user_image_1626012345678

    // Upload the base64 image to Cloudinary using a promise
    const result = await cloudinary.v2.uploader.upload(
      `data:image/jpeg;base64,${base64Image}`,
      {
        resource_type: "image",
        folder: "Volunteer_images",
        public_id: customPublicId,
      }
    );

    console.log("Image uploaded successfully");
    console.log("Public URL:", result.secure_url);
    console.log("Cloudinary ID:", result.public_id);

    return result;
  } catch (error) {
    console.error("Failed to upload image:", error);
    return { err: "image upload failed in volunteer_image_upload" };
  }
};

const volunteerSignup = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phoneno,
    authId,
    authImg,
    authType,
    image,
    password,
  } = req.body;
  console.log(req.body);
  let existingUser;
  try {
    existingUser = await volunteer.findOne({ email: email });
  } catch (err) {
    return res.status(500).json("Signing up failed, please try again later.");
  }

  if (existingUser) {
    return res.status(401).send("User already exists");
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "could not create user , please try again" });
  }

  const Image_Url = await image_Upload_VOLUNTEER(image);
  const createdUser = await new volunteer({
    firstname,
    lastname,
    email,
    phoneno,
    authId,
    authImg,
    authType,
    image: Image_Url.secure_url,
    password: hashedPassword,
    image_cloudinary_id: Image_Url.public_id,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return res.status(500).json("Signing up failed, please try again later.");
  }

  res.status(201).json({
    email: createdUser.email,
    id: createdUser._id,
  });
};

const login = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return res.status(500).json({ msg: "Error while log in" });
  }

  if (!existingUser) {
    return res
      .status(401)
      .json({ msg: "Invalid credentials could not log you in" });
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return res
      .status(500)
      .status({ msg: "check your credentials and try again" });
  }

  if (!isValidPassword) {
    return res
      .status(401)
      .json({ msg: "Invalid credentials could not log you in" });
  }

  return res.status(200).json({
    id: existingUser._id,
    email: existingUser.email,
    // token: token,
  });
};

module.exports = { volunteerSignup, signup, login };
