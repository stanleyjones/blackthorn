// import cookieParser from 'cookie-parser';
import express from 'express';
// import session from 'express-session';
// import { urlencoded } from 'body-parser';

export default function (app) {
  // app.use(session({
  //   secret: 'bimbimbim',
  //   resave: false,
  //   saveUninitialized: false,
  // }));

  // app.use(urlencoded({ extended: true }));
  // app.use(cookieParser());

  app.use(express.static('public'));
  app.get('*', (req, res) => { res.sendFile(`${__dirname}/../public/index.html`); });
}
