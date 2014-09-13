'use strict';

var Backbone = require('Backbone');

module.exports = Backbone.Model.extend({

	defaults: {
		'name': 'New Campaign',
		'gm': null,
		'players': []
	},

	initialize: function () {

	},

});