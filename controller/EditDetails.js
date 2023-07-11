const mongoose = require("mongoose");
const user = require("../model/User");
const volunteer = require("../model/volunteer");
const cloudinary = require("cloudinary");

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Failed to delete image:", error);
  }
};

const uploadImage = async (image) => {
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
    console.log("New image uploaded successfully");
    console.log("Public URL:", result.secure_url);
    console.log("Cloudinary ID new:", result.public_id);
    return result;
  } catch (error) {
    console.error("Failed to upload new image:", error);
    return { err: "image upload failed" };
  }
};

const editProfile = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phoneno,
    lattitude,
    longitude,
    image,
    password,
    id,
  } = req.body;

  try {
    const User = await user.findById(id);
    if (!User) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Retrieve the existing image public ID from the user collection
    const existingPublicId = User.image_cloudinary_id;

    // Call the deleteImage function with the existing public ID to delete the image from Cloudinary
    if (existingPublicId) {
      await deleteImage(existingPublicId);
      var imageUrl = await uploadImage(image);
    }

    const updatedUser = await user.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        phoneno,
        lattitude,
        longitude,
        image: imageUrl.secure_url,
        password,
        image_cloudinary_id: imageUrl.public_id,
      },
      { new: true } // Set the `new` option to true to return the updated document
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error while editing user Profile:", error);
    res.status(404).json({ msg: "Error while editing user Profile ", error });
  }
};

const delete_Image_Volunteer = async (publicId) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Failed to delete image:", error);
  }
};

const upload_Image_Volunteer = async (image) => {
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
        folder: "Volunteer_images",
        public_id: customPublicId,
      }
    );
    console.log("New image uploaded successfully");
    console.log("Public URL:", result.secure_url);
    console.log("Cloudinary ID new:", result.public_id);
    return result;
  } catch (error) {
    console.error("Failed to upload new image:", error);
    return { err: "image upload failed volunteer" };
  }
};
const volunteerEdit = async (req, res) => {
  const {
    firstname,
    lastname,
    id,
    email,
    phoneno,
    authId,
    authImg,
    authType,
    image,
    password,
  } = req.body;

  try {
    const Volunteer = await volunteer.findById(id);
    if (!Volunteer) {
      return res.status(404).json({ msg: "Volunteer not found" });
    }

    // Retrieve the existing image public ID from the user collection
    const existingPublicId = Volunteer.image_cloudinary_id;

    // Call the deleteImage function with the existing public ID to delete the image from Cloudinary
    if (existingPublicId) {
      await delete_Image_Volunteer(existingPublicId);
      var imageUrl = await upload_Image_Volunteer(image);
    }

    const updatedVolunteer = await volunteer.findByIdAndUpdate(
      { _id: id },
      {
        firstname,
        lastname,
        id,
        email,
        phoneno,
        authId,
        authImg,
        authType,
        image: imageUrl.secure_url,
        password,
        image_cloudinary_id: imageUrl.public_id,
      },
      { new: true }
    );
    res.status(200).json(updatedVolunteer);
  } catch (error) {
    res
      .status(404)
      .json({ msg: "Error while editing volunteer Profile ", error });
  }
};

module.exports = { editProfile, volunteerEdit };
