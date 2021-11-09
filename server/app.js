const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const volleyball = require("volleyball");

const app = express();

app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env["COOKIE_SECRET"]));
app.use(express.static(path.join(__dirname, "public")));

const authRequired = (req, res, next) => {
  const token = req.signedCookies.token;
  try {
    jwt.verify(token, process.env["JWT_SECRET"]);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are def not authorized.",
    });
    return;
  }
  next();
};

app.use("/auth", require("./routes/auth"));

app.use("/api", /*authRequired,*/ require("./routes"));

module.exports = app;
