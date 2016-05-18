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

	router.get('/', function (req, res) {
		res.status(200).json({ cookies: req.cookies });
	});

	router.post('/invite', passwordless.requestToken(users.email), users.invited);

// Logged In

	router.get('/campaigns', passwordless.restricted(), campaigns.all);

// Members Only (GM/Player)

	router.get('/campaigns/:id', passwordless.restricted(), auth.isMember, campaigns.one);

// Admin Only

	router.get('/users', passwordless.restricted(), auth.isAdmin, users.all);
	router.get('/users/:id', passwordless.restricted(), auth.isAdmin, users.one);

};