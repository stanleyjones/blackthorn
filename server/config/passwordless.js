'use strict';

var passwordless = require('passwordless'),
	passwordStore = require('passwordless-mongostore');

module.exports = function (app) {

	passwordless.init(new passwordStore(app.env.db));
	app.use(passwordless.sessionSupport());

};