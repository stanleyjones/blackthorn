'use strict';

var passwordless = require('passwordless'),
	passwordStore = require('passwordless-mongostore'),
	mail = require('../mail');

module.exports = function (app) {

	passwordless.init(new passwordStore(app.env.db));
	passwordless.addDelivery(mail.sendInvite);
	app.use(passwordless.sessionSupport());
	app.use(passwordless.acceptToken({allowPost: true}));
};