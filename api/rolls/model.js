const mongoose = require('mongoose');

const RollSchema = new mongoose.Schema({
	display: String,
	private: Boolean,
	resolution: [Number],
	total: Number,
});

RollSchema.pre('save', function (next) {
	const [dice, mods] = this.display.split('d').map(Number);
	this.resolution = Array(dice).fill().map(die => Math.ceil(Math.random() * 6));
	this.total = this.resolution.reduce((total, die) => total + die, mods);
	next();
});

module.exports = mongoose.model('Roll', RollSchema);