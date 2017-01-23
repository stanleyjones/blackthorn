// import cookieParser from 'cookie-parser';
import express from 'express';
// import session from 'express-session';
// import { urlencoded } from 'body-parser';
import path from 'path';

export default function (app) {
  // app.use(session({
  //   secret: 'bimbimbim',
  //   resave: false,
  //   saveUninitialized: false,
  // }));

  // app.use(urlencoded({ extended: true }));
  // app.use(cookieParser());

  app.get(/.*\.js/, express.static('public'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
  });
}
