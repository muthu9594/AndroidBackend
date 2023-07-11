const mongoose = require("mongoose");

const addEmergencyNoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  image_cloudinary_id: {
    type: String,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  relations: {
    type: String,
    required: true,
  },
  listofPeople: {
    type: Array,
    required: true,
  },
});

const addEmergencyNo = mongoose.model("EmergencyNo", addEmergencyNoSchema);
module.exports = addEmergencyNo;
