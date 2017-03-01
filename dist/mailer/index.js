'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendInvite = exports.sendPasscode = undefined;

var _nodemailer = require('nodemailer');

var _dotenv = require('dotenv');

(0, _dotenv.config)();

var transport = (0, _nodemailer.createTransport)({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

var sendPasscode = exports.sendPasscode = function sendPasscode(email, passcode) {
  var options = {
    to: email,
    from: process.env.MAIL_USER,
    subject: '[BLACKTHORN] Your Passcode',
    text: passcode
  };

  console.log('Sending passcode (' + passcode + ') to ' + email);
  transport.sendMail(options, function (err) {
    if (err) {
      console.log(err);
    }
  });
};

var sendInvite = exports.sendInvite = function sendInvite(email) {
  var options = {
    to: email,
    from: process.env.MAIL_USER,
    subject: '[BLACKTHORN] Your Invite',
    text: 'You\'ve been invited to join Blackthorn. Log in at ' + process.env.REACT_APP_API + '.'
  };

  console.log('Sending invite to ' + email);
  transport.sendMail(options, function (err) {
    if (err) {
      console.log(err);
    }
  });
};