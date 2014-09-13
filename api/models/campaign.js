'use strict';

var mongoose = require('mongoose');

var campaignSchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model('Campaign', campaignSchema);