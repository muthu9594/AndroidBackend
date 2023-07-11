const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

const login = mongoose.model("login", loginSchema);

module.exports = login;
