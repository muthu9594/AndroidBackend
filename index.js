const express = require("express");
const Connection = require("./db/db");
const routes = require("./routes/route");
const fileupload = require("express-fileupload");
const cloudinary = require("./config/cloudinary");

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

app.listen(5000, console.log("Server started successfully"));
Connection();
