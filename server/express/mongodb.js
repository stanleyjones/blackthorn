import mongoose from 'mongoose';

// import User from '../models/user';
// require('../models/campaign');

export default (app) => {
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => { console.log('connected:', app.env.db); });

  mongoose.connect(app.env.db);
};
