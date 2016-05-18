'use strict';

var mailer = require('nodemailer'),
	transporter = mailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'stanley.g.jones@gmail.com',
			pass: 'pash0heci7xu3lo8ba'
		}
	});

exports.sendInvite = function (token, uid, recipient, callback) {
	console.log('sending invite code "' + token + '" to ' + uid);

	var options = {
		to: recipient,
		from: '[BLACKTHORN] <stanley.g.jones@gmail.com>',
		subject: 'Your invite code',
		text: 'Login here: http://localhost:9000/api/invite/?token=' + token + '&uid=' + uid
	};

	transporter.sendMail(options, function (err) {
		if (err) { console.log(err); callback(err.message); }
		else { callback(); }
	});

	callback();
};