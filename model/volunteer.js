const mongoose = require("mongoose");

const volunteerSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  authId: {
    type: String,
    required: true,
  },
  authType: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  authImg: {
    type: String,
    required: true,
  },
  image_cloudinary_id: {
    type: String,
  },
});

const volunteer = mongoose.model("volunteer", volunteerSchema);
module.exports = volunteer;
