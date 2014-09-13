'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');
Backbone.$ = $;

var Campaigns = require('../collections/campaigns.js');

var template = require('../templates/campaignList.hbs');

module.exports = Backbone.View.extend({

	el: '.campaign-list',

	events: {
		'click .add-campaign': 'addNew'
	},

	initialize: function (user) {
		this.user = user || {};
		this.render();

		this.campaigns = new Campaigns(user);
		this.listenTo(this.campaigns, 'add', this.addOne);
		this.listenTo(this.campaigns, 'reset', this.addAll);
	},

	addOne: function (campaign) {
		var campaignListItem = '<li>' + campaign.get('name') + '</li>';
		this.$('ul').append(campaignListItem);
	},

	addAll: function () {
		this.campaigns.forEach(this.addOne, this);
	},

	addNew: function () {
		this.campaigns.add({});
		// [TODO] Set current user as GM
 	},

	render: function () {
		this.$el.html(template({
			campaigns: this.campaigns
		}));
	}

});