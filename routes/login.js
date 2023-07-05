var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");
const routes = require("express").Router();

routes.post("/", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      //if User doesn't exist in the database
      if (!user) {
        return res.status(404).send({
          message: "User not found ",
        });
      }
      // comparing Password
      var passwordIsValid = bcrypt.compareSync(
        req.body.password, // Entered Password
        user.password // Hash
      );
      //checking Password valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password !",
        });
      }
      //Creating Token
      var token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
        expiresIn: 86000,
      });
      // Responding to Client with token  and message
      res.status(200).send({
        message: "Login SUccesfull",
        accessToken: token,
      });
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
});

module.exports = routes;
