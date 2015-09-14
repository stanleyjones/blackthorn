'use strict';

exports.isUser = function (req, res, next) {
	// [TODO] Check if user is logged in
	console.log('requiring user');
	if (true) { return next(); }
	res.redirect('/login');
};

exports.isMember = function (req, res, next) {
	// [TODO] Check if user is GM/player of campaign
	console.log('requiring gm/player');
	if (true) { return next(); }
	res.redirect('/login');
};

exports.isGm = function (req, res, next) {
	// [TODO] Check if user is GM
	console.log('requiring gm');
	if (true) { return next(); }
	res.redirect('/login');
};

exports.isAdmin = function (req, res, next) {
	// [TODO] Check if user is admin
	console.log('requiring admin');
	if (true) { return next(); }
	res.redirect('/login');
};