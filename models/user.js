const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullName: String,
  email: {
    type: String,
    unique : [true, "email already exists in database!"],
    trim: true
  },
  preferences: [String],
  password: String,
  created: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;