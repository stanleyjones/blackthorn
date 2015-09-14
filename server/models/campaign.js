'use strict';

var mongoose = require('mongoose');

var campaignSchema = mongoose.Schema({
	name: String
});

var Campaign = mongoose.model('Campaign', campaignSchema);

exports.seed = function () {
	Campaign.find({}).exec(function (err, collection) {
		if (collection.length === 0) {
			Campaign.create({ name: 'Seed Campaign 1' });
			Campaign.create({ name: 'Seed Campaign 2' });
		}
	});
};