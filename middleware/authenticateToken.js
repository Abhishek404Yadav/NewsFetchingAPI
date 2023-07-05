const user = require("../models/user");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (req.headers && token && token.split(" ")[0] === "JWT") {
    jwt.verify(token.split(" ")[1], process.env.API_SECRET, (decode, err) => {
      if (err) {
        req.user = undefined;
        next();
      }
      User.findOne({
        _id: decode.id,
      })
        .then((user) => {
          req.user == user;
          next();
        })
        .catch((err) => {
          res.status(500).send({
            message: err,
          });
        });
    });
  } else {
    req.headers = undefined;
    req.message = "Authorizaation header not found";
    next();
  }
};

module.exports = verifyToken;
