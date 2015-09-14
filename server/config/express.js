'use strict';

var session = require('express-session'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser');

module.exports = function (app) {

	app.use(session({
		secret: 'bimbimbim',
		resave: false,
		saveUninitialized: false
	}));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cookieParser());

};