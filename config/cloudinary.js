const cloudinary = require("cloudinary");

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: "da4eumtei",
      api_key: "116529482199821",
      api_secret: "szZsMnEFVXtJaspP5P8zCzLA3F0",
    });
  } catch (error) {
    console.log("Error while connecting to cloudinary", error);
  }
};
