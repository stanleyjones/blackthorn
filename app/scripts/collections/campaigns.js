'use strict';

var Backbone = require('backbone');

var Campaign = require('../models/campaign.js');

module.exports = Backbone.Collection.extend({

	model: Campaign,
	url: '/api/campaigns',

	initialize: function (user) {
		this.fetch({reset: true});
	}

});