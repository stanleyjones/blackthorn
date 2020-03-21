const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: String,
  userId: String
});

module.exports = mongoose.model("Game", GameSchema);
