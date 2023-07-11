const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

const addEmergencyNos = require("../model/addEmergencyNo");

// const uploadFileToCloudinary = async (file, folder) => {
//   cloudinary.uploader
//     .upload_stream({ resource_type: "image" }, (error, result) => {
//       if (error) {
//         console.error("Error uploading image:", error);
//         return res.status(500).json({ message: "Error uploading image." });
//       }

//       console.log("Image uploaded to Cloudinary:", result);
//       return res.status(200).json({ message: "Image uploaded to Cloudinary." });
//     })
//     .end(file);
// };

// const imageUpload = async (req, res) => {
//   try {
//     const base64Image = req.body.image;
//     console.log(base64Image);

//     const binaryImage = Buffer.from(base64Image, "base64");

//     // const response = await uploadFileToCloudinary(binaryImage, "imagesUsers");
//     const folder = "images";
//     const public_id = `${folder}/image_${Date.now()}`;
//     cloudinary.uploader
//       .upload_stream(
//         { resource_type: "image", folder, public_id },
//         (error, result) => {
//           if (error) {
//             console.error("Error uploading image:", error);
//             return res.status(500).json({ message: "Error uploading image." });
//           }

//           console.log("Image uploaded to Cloudinary:", result);
//           console.log(result);
//           return res.status(200).json("successfull");
//         }
//       )
//       .end(binaryImage);
//   } catch (error) {
//     console.log(error);
//   }
// };

// ...

// // Create a route to handle the file upload
// const imageUpload = (req, res) => {
//   // Assuming you're sending the base64 image from Android in the 'image' field
//   const base64Image = req.body.image;

//   // Convert base64 image to binary data
//   const binaryImage = Buffer.from(base64Image, "base64");

//   // Specify the folder name for the uploaded image in Cloudinary
//   const folder = "images";

//   // Generate a unique public_id for the uploaded image
//   const public_id = `/${folder}/image_${Date.now()}`;

//   // Upload the binary image to Cloudinary with the specified folder and public_id
//   cloudinary.uploader
//     .upload_stream(
//       { resource_type: "image", folder, public_id },
//       (error, result) => {
//         if (error) {
//           console.error("Error uploading image:", error);
//           return res.status(500).json({ message: "Error uploading image." });
//         }

//         console.log("Image uploaded to Cloudinary:", result);
//         return res
//           .status(200)
//           .json({ message: "Image uploaded to Cloudinary." });
//       }
//     )
//     .end(binaryImage);
// };

// // ...========================
const imageUpload = async (image) => {
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
        folder: "add_Emergency_images",
        public_id: customPublicId,
      }
    );

    console.log("Image uploaded successfully");
    console.log("Public URL:", result.secure_url);
    console.log("Cloudinary ID:", result.public_id);

    return result;
  } catch (error) {
    console.error("Failed to upload image:", error);
    return res.status(500).json("image upload failed");
  }
};

const addEmergencyNo = async (req, res) => {
  const { name, image, phoneno, email, relations, listofPeople } = req.body;
  console.log(name, phoneno, email, relations, listofPeople);
  try {
    const imageUrl = await imageUpload(image);
    console.log("nimage URL=============>>>>>>>", imageUrl);
    const addDetails = await new addEmergencyNos({
      name,
      image: imageUrl.secure_url,
      phoneno,
      email,
      relations,
      listofPeople,
      image_cloudinary_id: imageUrl.public_id,
    });
    await addDetails.save();
    res.status(200).json({ data: addDetails, msg: "Data added successfully" });
  } catch (error) {
    res.status(500).json({ error, msg: "Error while adding data" });
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary1(file, folder) {
  const options = { folder };
  await cloudinary.v2.uploader.upload(file.tempFilePath, options);
}

const imageUpload1 = async (req, res) => {
  try {
    const file = req.files.imageFile;
    console.log(file);

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res
        .status(400)
        .json({ success: false, message: "File format not supported" });
    }

    const response = await uploadFileToCloudinary1(file, "codeHelp");

    res.json({
      success: true,
      message: "image successfully uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "somenthing went wrong",
    });
  }
};

module.exports = { addEmergencyNo, imageUpload };
