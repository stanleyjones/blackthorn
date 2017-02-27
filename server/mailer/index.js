import { createTransport } from 'nodemailer';

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
    from: `[BLACKTHORN] <${process.env.MAIL_USER}>`,
    subject: 'Your Passcode',
    text: passcode,
  };

  console.log(`Sending passcode (${passcode}) to ${email}`);
  transport.sendMail(options, (err) => { if (err) { console.log(err); } });
};
