const express = require("express");
const BodyParser = require("body-parser");

const characters = require("./characters/controller");
const games = require("./games/controller");
const users = require("./users/controller");

const app = express();

app.use(BodyParser.json());

app.get("/", (_, res) => res.status(200).json());

app.use("/characters", characters);
app.use("/games", games);
app.use("/users", users);

module.exports = app;
