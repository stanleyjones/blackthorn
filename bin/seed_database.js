#!/usr/bin/env node

import { connect } from '../server/mongodb';

const rootUser = {
  admin: true,
  email: 'stanley@sunshocked.com',
  name: 'Stanley G. Jones',
};

connect((err, db) => {
  if (err) { console.error('Error connecting to database:', err); return; }
  console.log('Seeding database...');
  db.collection('users').update(
    { email: rootUser.email },
    { $set: rootUser },
    { upsert: true },
    seedErr => {
      if (seedErr) { console.error('Error seeding database:', err); return; }
      db.close();
      console.log('Done.');
    }
  );
});
