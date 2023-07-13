const routes = require("express").Router();
const verifyToken = require("../middleware/authenticateToken");
const User = require("../models/user");

routes
  .route("/")
  .get(verifyToken, (req, res) => {
    if (!req.user && req.message == null) {
      res.status(403).send({
        message: "Invalid JWT Token",
      });
    } else if (!req.user && req.message) {
      res.status(403).send({
        message: req.message,
      });
    }
    const preferences = req.user.preferences ||[];
    res.status(200).send({ preferences });
  })
  .put(verifyToken, (req, res) => {
    if (!req.user && req.message == null) {
      res.status(403).send({
        message: "Invalid JWT Token",
      });
    } else if (!req.user && req.message) {
      res.status(403).send({
        message: req.message,
      });
    }
    const preferences = req.body.preferences;
    // Update the preferences for the authenticated user
    User.findByIdAndUpdate(req.user._id, { preferences }, { new: true })
      .then((updatedUser) => {
        if (!updatedUser) {
          res.status(404).send({ message: "User not found" });
        }
        res.status(200).json({ preferences: updatedUser.preferences });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Failed to update preferences",
        });
      });
  });

module.exports = routes;
