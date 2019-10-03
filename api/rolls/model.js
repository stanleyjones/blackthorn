const mongoose = require('mongoose');

const RollSchema = new mongoose.Schema({
	resolution: [Number],
	structure: [Number],
	total: Number
});

RollSchema.pre('save', function (next) {
	const [dice, mods] = this.structure;
	this.resolution = Array(dice).fill().map(die => Math.ceil(Math.random() * 6));
	this.total = this.resolution.reduce((total, die) => total + die, mods);
	next();
});

module.exports = mongoose.model('Roll', RollSchema);