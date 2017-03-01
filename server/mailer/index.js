import { createTransport } from 'nodemailer';
import { config } from 'dotenv';

config();

const transport = createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendPasscode = (email, passcode) => {
  const options = {
    to: email,
    from: process.env.MAIL_USER,
    subject: '[BLACKTHORN] Your Passcode',
    text: passcode,
  };

  console.log(`Sending passcode (${passcode}) to ${email}`);
  transport.sendMail(options, (err) => { if (err) { console.log(err); } });
};

export const sendInvite = (email) => {
  const options = {
    to: email,
    from: process.env.MAIL_USER,
    subject: '[BLACKTHORN] Your Invite',
    text: `You've been invited to join Blackthorn. Log in at ${process.env.REACT_APP_API}.`,
  };

  console.log(`Sending invite to ${email}`);
  transport.sendMail(options, (err) => { if (err) { console.log(err); } });
};
