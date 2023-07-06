const express = require("express");
const bodyParser = require("body-parser");
//importing files
const register = require("./routes/register");
const login = require("./routes/login");
const preferences = require("./routes/preferences");
const news = require("./routes/news");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 connectDB();

//Endpoint Handling

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/preferences", preferences);
app.use("api/news", news);

const PORT = 3000;

app.listen(process.env.PORT || PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
