const mongoose = require("mongoose");
const user = require("../model/User");
const volunteer = require("../model/volunteer");

const getAllUser = async (req, res) => {
  try {
    const data = await user.find({});
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ msg: "Error while getting user data", error });
  }
};

const getAllVolunteer = async (req, res) => {
  try {
    const data = await volunteer.find({});
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ msg: "Error while getting volunteer data", error });
  }
};

module.exports = { getAllUser, getAllVolunteer };
