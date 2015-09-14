'use strict';

var	express = require('express'),
	router = express.Router(),
	auth = require('./auth'),
	users = require('../routes/users'),
	campaigns = require('../routes/campaigns');

module.exports = function (app) {

	app.use('/api', router);

// Unrestricted

	// [TODO] Test for and return user if logged in
	router.get('/', function (req, res) { res.json({ status: 'ok', cookies: req.cookies }); });

	router.post('/invite', users.requestInvite);
	router.get('/invite/:invite_code', users.acceptInvite);

	router.get('/login', users.login);

	// router.post('/invite', passwordless.requestToken(users.requestToken));
	// router.get('/invite', passwordless.acceptToken({successRedirect: '/'}));

// Logged In

	router.get('/campaigns', auth.isUser, campaigns.all);

// Members Only (GM/Player)

	router.get('/campaigns/:id', auth.isMember, campaigns.one);

// Admin Only

	router.get('/users', auth.isAdmin, users.all);
	router.get('/users/:id', auth.isAdmin, users.one);

};