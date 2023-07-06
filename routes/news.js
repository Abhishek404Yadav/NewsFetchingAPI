const routes = require("express").Router();
const verifyToken = require("../middleware/authenticateToken");
const fetchNews = require("../controller/newsFetch");

routes.get("/", verifyToken, async (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send({
      message: "Invalid JWT Token",
    });
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  }
  const preferences = req.user.preferences;
  let key = process.env.API_KEY;
  const query = preferences.join(" OR ");
  let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${key}`;

  try {
    const news = await fetchNews(url);
    res.status(200).send({ news : news.data });
  } catch(err) {
    res.status(500).send({
      message: err.message || "Failed to retrieve news",
    });
  }
});

module.exports = routes;
