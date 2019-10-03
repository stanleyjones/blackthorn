const Roll = require('./model');

const resolver = {};

resolver.create = async payload => {
	const roll = new Roll(payload);
	await roll.save();
	return roll;
};

resolver.getLatest = async () => {
	const rolls = await Roll.find();
	return rolls;
};

module.exports = resolver;