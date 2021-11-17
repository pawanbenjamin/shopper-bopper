const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const volleyball = require("volleyball");

const app = express();

app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env["COOKIE_SECRET"]));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../client", "build")));

app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes"));

app.get(
  "*",
  express.static(path.join(__dirname, "../client", "build", "index.html"))
);

module.exports = app;
