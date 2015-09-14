'use strict';

var passwordless = require('passwordless'),
	passwordStore = require('passwordless-mongostore');

module.exports = function (app) {

	var mongoDb = 'mongodb://localhost/blackthorn';
	passwordless.init(new passwordStore(mongoDb));
	app.use(passwordless.sessionSupport());

};