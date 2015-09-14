'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');
Backbone.$ = $;

var template = require('../templates/login.hbs');

module.exports = Backbone.View.extend({

	el: '#app',

	events: {
		'click .login button': 'submit'
	},

	initialize: function (app) {
		this.app = app;
		this.render();
	},

	render: function () {
		this.$el.html(template());
		this.$('.alert').hide();
	},

	submit: function (ev) {
		// var _this = this;
		ev.preventDefault();

		$('.alert').hide();

		var login = this.$('.login').serialize();
		this.$('.login').fadeOut();

		$.post('/api/login', login)
			.done(function (res) {
				this.$('.alert-info').html(res.message).fadeIn();
			})
			.fail(function (res) {
				this.$('.alert-warning').html(res.responseJSON.message).fadeIn();
			});
	}


});