'use strict';

var mailer = require('nodemailer'),
	transporter = mailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'stanley.g.jones@gmail.com',
			pass: 'pash0heci7xu3lo8ba'
		}
	});

exports.sendHash = function (email, hash) {
	console.log('sending invite code "' + hash + '" to ' + email);

	var options = {
		to: email,
		from: '[BLACKTHORN] <stanley.g.jones@gmail.com>',
		subject: 'Your invite code',
		text: 'Login here: http://localhost:9000/api/login/' + hash,
		html: 'Login <a href="http://localhost:9000/api/login/' + hash + '">here</a>.'
	};

	transporter.sendMail(options, function (err, res) {
		if (err) { console.log(err); }
		else { console.log('Message sent: ' + res.response); }
	});

};