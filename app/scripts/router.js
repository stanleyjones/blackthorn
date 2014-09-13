'use strict';

var Backbone = require('backbone');

module.exports = Backbone.Router.extend({

	initialize: function (app) {
		this.app = app;
		Backbone.history.start({pushState: true});
	},

	routes: {
		'': 'index',
		'login': 'login'
	},

	index: function () { this.app.showIndex(); },
	login: function () { this.app.showLogin(); }

});