const { default: axios } = require("axios");

function fetchNews(url) {
  return axios.get(url);
}

module.exports = fetchNews;
