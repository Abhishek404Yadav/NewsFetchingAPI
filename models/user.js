const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullName: String,
  email: String,
  preferences: [String],
  password: String,
  created: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model("User", userSchema);
module.exports = User;