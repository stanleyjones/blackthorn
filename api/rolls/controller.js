const Roll = require('./model');

const handleRoll = async (payload, cxn) => {
	const roll = new Roll(payload);
	await roll.save();

	const rolls = await Roll.find();
	cxn.send('rolls', rolls);
};

module.exports = { handleRoll };