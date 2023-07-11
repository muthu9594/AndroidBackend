const express = require("express");
const Connection = require("./db/db");
const routes = require("./routes/route");
const fileupload = require("express-fileupload");
const cloudinary = require("./config/cloudinary");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/", routes);

cloudinary.cloudinaryConnect();
const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log("Server started successfully"));
Connection();
