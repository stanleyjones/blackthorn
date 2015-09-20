'use strict';

var	express = require('express'),
	router = express.Router(),
	passwordless = require('passwordless'),
	auth = require('./auth'),
	users = require('../routes/users'),
	campaigns = require('../routes/campaigns');

module.exports = function (app) {

	app.use('/api', router);

// Unrestricted

	// [TODO] Test for and return user if logged in
	router.get('/', function (req, res) {
		res.status(200).json({ cookies: req.cookies });
	});

	router.post('/invite', passwordless.requestToken(users.email), users.invited);
	router.get('/invite', users.accept);

	router.get('/login', users.login);

// Logged In

	router.get('/campaigns', passwordless.restricted(), campaigns.all);

// Members Only (GM/Player)

	router.get('/campaigns/:id', auth.isMember, campaigns.one);

// Admin Only

	router.get('/users', auth.isAdmin, users.all);
	router.get('/users/:id', auth.isAdmin, users.one);

};