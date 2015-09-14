'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	mail = require('../mail');

exports.all = function (req, res) {
	console.log('finding all users');

	User.find({}, function (err, users) {
		if (err) { res.status(500).json({message: err}); }
		else { res.status(200).json(users); }
	});
};

exports.one = function (req, res) {
	console.log('finding one user');

	User.findOne({_id: req.params.id}, function (err, user) {
		if (err) { res.status(500).json({message: err}); }
		else { res.status(200).json(user); }
	});
};

// Receives an email, finds a user, and generates an invite code
exports.requestInvite = function (req, res) {
	var email = req.params.email;
	User.findOne({email: email}, function (err, user) {
		if (!email) { res.status(400).json({message: 'Email address required.'}); }
		else if (err) { res.status(500).json({message: err}); }
		else if (!user) { res.status(404).json({message: 'Unrecognized email address.'}); }
		else {
			user.generateHash(email);
			mail.sendHash(user.email, user.hash);
			res.status(200).json({message: 'invited: ' + email});
		}
	});
};

// Receives an invite code and returns a user ID and auth token
exports.acceptInvite = function (req, res) {
	User.findOne({hash: req.params.invite_code}, function (err, user) {
		if (err) { res.status(500).json({message: err}); }
		if (!user) { res.status(404).json({message: 'Unrecognized invite code.'}); }
		// [TODO] Check if hash expired
		// [TODO] Compare request/redeem invite IPs
		else {
			console.log('accepted invite:', user.email);
			res.cookie('user', user._id, {maxAge: 31536000});
			res.cookie('token', 'xyz', {maxage: 31536000});
			res.redirect('/');
		}
	});
};