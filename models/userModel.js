const mongoose = require("mongoose");

//Схема запису в базі данних
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, enter your name "],
  },
  email: {
    type: String,
    required: [true, "Please, enter unique email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please, enter password"],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
