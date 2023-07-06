var bcrypt = require("bcrypt");
var User = require("../models/user");
const routes = require("express").Router();

routes.post("/", (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    preferences: req.body.preferences,
    password: bcrypt.hashSync(req.body.password, 5),
  });

  user
    .save()
    .then((data) => {
      res.status(200).send({ message: "User Registered Succesfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
      return;
    });
});

module.exports = routes;
