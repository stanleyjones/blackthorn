const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
	description: String,
	gameId: String,
	name: String,
	userId: String,
});

module.exports = mongoose.model('Character', CharacterSchema);