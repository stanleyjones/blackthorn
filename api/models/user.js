'use strict';

var mongoose = require('mongoose'),
	crypto = require('crypto');

var userSchema = new mongoose.Schema({
	email: String,
	hash: String
});

userSchema.methods.generateHash = function (email) {
	this.hash = crypto.createHash('md5').update(email).digest('hex');
	this.save();
};

module.exports = mongoose.model('User', userSchema);