const Joi = require('joi');
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

const joiValidate = (obj) => {
  const schema = Joi.object({
    fullName: Joi.string().regex(/^[a-zA-Z ]{1,20}$/).message('Name should not contain any special charecter or number').required(),
    email: Joi.string().trim().lowercase().email().required(),
    preferences: Joi.array().items(Joi.string()).required(),
    password: Joi.string().min(8).max(30)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%&*?])[A-Za-z\d$@!%&*?]+$/)
  .message(
    'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
  )
  .required(),

  created: Joi.date(),
  });
  return schema.validate(obj);
};
module.exports = {User,joiValidate}