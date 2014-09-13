'use strict';

var User = require('../models/user'),
	mail = require('../mail');

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

exports.login = function (req, res) {
	// Receives an email, finds a user, and generates an invite code
	var email = req.param('email');
	User.findOne({email: email}, function (err, user) {
		if (err) { res.status(500).json({message: err}); }
		if (!user) { res.status(404).json({message: 'Unrecognized email address.'}); }
		else {
			user.generateHash(email);
			mail.sendHash(user.email, user.hash);
			res.status(200).json({message: 'Invite code sent.'});//user.hash});
		}
	});
};

exports.loginHash = function (req, res) {
	// Receives an invite code and returns a user ID and auth token
	User.findOne({hash: req.param('hash')}, function (err, user) {
		if (err) { res.status(500).json({message: err}); }
		if (!user) { res.status(404).json({message: 'Unrecognized invite code.'}); }
		// [TODO] Check if hash expired
		// [TODO] Compare request/redeem invite IPs
		else {
			res.cookie('user', user.id, {maxAge: 31536000});
			res.cookie('token', 'xyz', {maxage: 31536000});
			res.redirect('/');
		}
	});
};