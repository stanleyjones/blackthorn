'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.all = function (req, res) {
	User.find({}, function (err, users) {
		if (err) { res.status(500).json({message: err}); }
		else { res.status(200).json(users); }
	});
};

exports.one = function (req, res) {
	User.findOne({_id: req.params.id}, function (err, user) {
		if (err) { res.status(500).json({message: err}); }
		else { res.status(200).json(user); }
	});
};

exports.email = function (email, delivery, callback) {
	User.findOne({email: email}, function (err, user) {
		if (err) { callback(err); }
		else { callback(null, user._id); }
	});
};

exports.invited = function (req, res) {
	res.status(200).json({message: 'invited'});
};