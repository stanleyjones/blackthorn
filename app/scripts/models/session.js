'use strict';

var Backbone = require('Backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		'token': null,
		'user': null
	},

	initialize: function () {
		this.load();
	},

	authenticated: function () {
		return this.has('token');
	},

	save: function (auth) {
		document.cookie = 'user=' + encodeURI(auth.user) + '; max-age=600; path=/';
		document.cookie = 'token=' + encodeURI(auth.token) + '; max-age=600; path=/';
	},

	load: function () {
		this.set('token', this.read('token'));
		this.set('user', this.read('user'));
	},

	read: function (name) {
		var cookie = document.cookie.match(new RegExp(name + '=([^;]+)'));
		if (cookie) { return decodeURI(cookie[1]); }
		return null;
	}

});