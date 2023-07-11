const express = require("express");
const router = express.Router();

const { addEmergencyNo, imageUpload } = require("../controller/AddDetails");
const { editProfile, volunteerEdit } = require("../controller/EditDetails");
const { getAllUser, getAllVolunteer } = require("../controller/getDetails");
const { volunteerSignup, signup, login } = require("../controller/User");
const { Notification } = require("../controller/PushNotification");

router.post("/signup", signup);
router.post("/login", login);

router.post("/editprofile", editProfile);
router.post("/addEmergencyNo", addEmergencyNo);

router.post("/volunteerSignup", volunteerSignup);
router.post("/volunteerEdit", volunteerEdit);

router.get("/getAllUser", getAllUser);
router.get("/getAllVolunteer", getAllVolunteer);

router.post("/notification", Notification);

module.exports = router;
