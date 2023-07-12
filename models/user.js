const Joi = require('joi');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullName: String,
  email: String,
  preferences: [String],
  password: {
    type: String,
    required : true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model("User", userSchema);

const joiValidate = (obj) => {
  const schema = Joi.object({
    fullName: Joi.string().regex(/^[a-zA-Z ]{1,20}$/).required(),
    email: Joi.string().trim().lowercase().email().required(),
    preferences: Joi.array().items(Joi.string()).required(),
    password: Joi.string().required(),
    created: Joi.date(),
  });
  return schema.validate(obj);
};
module.exports = {User,joiValidate}