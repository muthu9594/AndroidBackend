const mongoose = require("mongoose");
require("dotenv").config();

const URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@androidbackend.aofvdjz.mongodb.net/?retryWrites=true&w=majority`;
const Connection = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connceting to database", error);
  }
};

module.exports = Connection;
