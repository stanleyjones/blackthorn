'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');
Backbone.$ = $;

var CampaignList = require('../views/campaignList.js');

var template = require('../templates/profile.hbs');

module.exports = Backbone.View.extend({

	el: '#app',

	initialize: function (user) {
		this.user = user || {};
		this.render();

		this.campaignList = new CampaignList(user);
	},

	render: function () {
		console.log('user:', this.user);
		this.$el.html(template({ user: this.user }));
	}

});