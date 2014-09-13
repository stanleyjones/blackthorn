'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');
Backbone.$ = $;

var Router = require('../router.js'),
	Session = require('../models/session.js'),

	LoginView = require('./login.js'),
	ProfileView = require('./profile.js');

module.exports = Backbone.View.extend({

	el: '#app',

	initialize: function () {
		this.render();
		this.session = new Session();
		this.router = new Router(this);
	},

	render: function () {
		this.$el.html('Loading...');
	},

	showIndex: function () {
		if (this.session.authenticated()) {
			this.showProfile();
		} else {
			this.showLogin();
		}
	},

	showLogin: function () {
		console.log('showing login');
		this.loginView = new LoginView(this);
	},

	showProfile: function () {
		console.log('showing profile');
		this.profileView = new ProfileView({user: this.session.get('user')});
	}

});