const OneSignal = require("onesignal-node");
const client = require("../config/oneSignal");

const notification = new OneSignal.Notification({
  contents: {
    en: "This is the notification message",
  },
  android_channel_id: "YOUR_ANDROID_CHANNEL_ID", // Optional
  data: { key1: "value1", key2: "value2" }, // Optional additional data
});

notification.postBody["included_segments"] = ["All"]; // Send to all users
// OR
notification.postBody["include_player_ids"] = ["PLAYER_ID_1", "PLAYER_ID_2"]; // Send to specific devices

client.sendNotification(notification, function (err, httpResponse, data) {
  if (err) {
    console.error("Error sending OneSignal notification:", err);
  } else {
    console.log("OneSignal notification sent successfully:", data);
  }
});
