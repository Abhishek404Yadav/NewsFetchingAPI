var bcrypt = require("bcrypt");
const routes = require("express").Router();
const { User, joiValidate } = require("../models/user"); // Replace "./path/to/userSchema" with the actual path to your user schema module

routes.post("/", (req, res) => {
  const { error, value } = joiValidate(req.body); // Validate request body using Joi schema

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const userInfo = {
    fullName: value.fullName,
    email: value.email,
    preferences: value.preferences,
    password: bcrypt.hashSync(value.password, 5),
  };

  // Create a new user using the User model
  const newUser = new User(userInfo);

  newUser.save()
    .then(() => {
      res.status(200).json({ message: "User created successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = routes;
