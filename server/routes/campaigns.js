'use strict';

var mongoose = require('mongoose'),
	Campaign = mongoose.model('Campaign');

exports.all = function (req, res) {
	console.log('finding all campaigns');

	Campaign.find({}, function (err, campaigns) {
		if (err) { res.status(500).json({message: err}); }
		else { res.status(200).json(campaigns); }
	});
};

exports.one = function (req, res) {
	console.log('finding one campaign');

	Campaign.findOne({_id: req.params.id}, function (err, campaign) {
		if (err) { res.status(500).json({message: err}); }
		else { res.status(200).json(campaign); }
	});
};