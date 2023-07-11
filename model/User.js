const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  lattitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
  image_cloudinary_id: {
    type: String,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
