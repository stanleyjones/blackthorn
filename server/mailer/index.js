import { createTransport } from 'nodemailer';

const transport = createTransport({
  service: 'Gmail',
  auth: {
    user: 'stanley.g.jones@gmail.com',
    pass: 'CWNwP7npUJqAGDNkHAzsfJdE',
  },
});

export const sendPasscode = (email, passcode) => {
  const options = {
    to: email,
    from: '[BLACKTHORN] <stanley.g.jones@gmail.com>',
    subject: 'Your Passcode',
    text: passcode,
  };

  console.log(`Sending passcode (${passcode}) to ${email}`);
  transport.sendMail(options, err => { if (err) { console.log(err); } });
};


// 'use strict';

// var mailer = require('nodemailer'),
// 	transporter = mailer.createTransport({
// 		service: 'Gmail',
// 		auth: {
// 			user: 'stanley.g.jones@gmail.com',
// 			pass: 'pash0heci7xu3lo8ba'
// 		}
// 	});

// exports.sendInvite = function (token, uid, recipient, callback) {
// 	console.log('sending invite code "' + token + '" to ' + uid);

// 	var options = {
		// to: recipient,
		// from: '[BLACKTHORN] <stanley.g.jones@gmail.com>',
		// subject: 'Your invite code',
		// text: 'Login here: http://localhost:9000/api/invite/?token=' + token + '&uid=' + uid
// 	};

// 	transporter.sendMail(options, function (err) {
// 		if (err) { console.log(err); callback(err.message); }
// 		else { callback(); }
// 	});

// 	callback();
// };
