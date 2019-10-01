const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
	userId: String,
	name: String
});

module.exports = mongoose.model('Game', GameSchema);