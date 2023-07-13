var bcrypt = require("bcrypt");
const routes = require("express").Router();
const  User = require("../models/user");
const joiValidate= require("../validator/joiValidate")

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
  const user = new User(userInfo);

  user.save()
    .then(() => {
      res.status(200).send({ message: "User created successfully" });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

module.exports = routes;
