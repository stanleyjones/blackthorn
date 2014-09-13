'use strict';

var Campaign = require('../models/campaign');

var seedCampaigns = [
	{name: 'New Campaign'},
	{name: 'Old Campaign'}
];

exports.all = function (req, res) {
	Campaign.find({}, function (err, campaigns) {
		if (err) { res.status(500).json({message: err}); }
		else { res.status(200).json(seedCampaigns); }
	});
};

exports.one = function (req, res) {
	Campaign.findOne({_id: req.params.id}, function (err, campaign) {
		if (err) { res.status(500).json({message: err}); }
		else { res.status(200).json(campaign); }
	});
};