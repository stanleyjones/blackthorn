'use strict';

var mongoose = require('mongoose');

require('../models/user');
require('../models/campaign');

module.exports = function (app) {

	mongoose.connect(app.env.db);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
		console.log('connected:', app.env.db);
	});

};