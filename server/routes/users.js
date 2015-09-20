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

exports.email = function (email, delivery, callback) {
	User.findOne({email: email}, function (err, user) {
		if (err) { callback(err); }
		else { callback(null, user._id); }
	});
};

// Receives an email, finds a user, and generates an invite code
exports.invited = function (req, res) {
	res.status(200).json({message: 'invited'});
};

// Receives an invite code and returns a user ID and auth token
exports.accept = function (req, res) {

	res.status(200).json({message: 'accepted'});

	// User.findOne({hash: req.params.invite_code}, function (err, user) {
	// 	if (err) { res.status(500).json({message: err}); }
	// 	if (!user) { res.status(404).json({message: 'Unrecognized invite code.'}); }
	// 	// [TODO] Check if hash expired
	// 	// [TODO] Compare request/redeem invite IPs
	// 	else {
	// 		console.log('accepted invite:', user.email);
	// 		res.cookie('user', user._id, {maxAge: 31536000});
	// 		res.cookie('token', 'xyz', {maxage: 31536000});
	// 		res.redirect('/');
	// 	}
	// });
};

// Used by client to validate user on initial bootup
exports.login = function (req, res) {
	console.log(req.cookies);
	// [TODO] Use Passwordless to actually log in
	var loggedIn = req.cookies.token && req.cookies.token === 'xyz';
	if (loggedIn) { res.status(200).json({message: 'Logged in.'}); }
	else { res.status(403).json({message: 'Unable to authenticate.'}); }
};