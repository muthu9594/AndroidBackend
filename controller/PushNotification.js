const mongoose = require("mongoose");
const Login = require("../model/login");

const OneSignal = require("onesignal-node");
const client = require("../config/oneSignal");

const Notification = async (req, res) => {
  const { token } = req.body; // Retrieve the token from the request body

  try {
    const login = await Login.findOne({ token });
    if (!login) {
      return res.status(404).json({ msg: "Token not found" });
    }

    const notification = new OneSignal.Notification({
      contents: {
        en: "This is the notification message",
      },
      android_channel_id: "YOUR_ANDROID_CHANNEL_ID", // Optional
      data: login, // Optional additional data
    });

    notification.postBody["include_player_ids"] = [login.token]; // Set the token as the include_player_ids

    client.sendNotification(notification, function (err, httpResponse, data) {
      if (err) {
        console.error("Error sending OneSignal notification:", err);
        return res.status(500).json({ msg: "Failed to send notification" });
      } else {
        console.log("OneSignal notification sent successfully:", data);
        return res.status(200).json({ msg: "Notification sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error while retrieving token:", error);
    res.status(500).json({ msg: "Failed to retrieve token" });
  }
};

module.exports = { Notification };
