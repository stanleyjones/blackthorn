#!/usr/bin/env node

const mongoClient = require('mongodb').MongoClient;
const config = require('../config.json');
const environment = process.env.NODE_ENV || 'development';
const mongoUrl = config[environment].db;

const rootUser = { email: 'stanley@sunshocked.com', admin: true };

const seedDatabase = (db, cb) => {
  db.collection('users').insertOne(rootUser, err => {
    if (err) { console.error('Error inserting root user:', err); return; }
    cb();
  });
};

mongoClient.connect(mongoUrl, (err, db) => {
  if (err) { console.error('Error connecting to database:', err); return; }
  console.log('Seeding database...');
  seedDatabase(db, () => {
    db.close();
    console.log('Done.');
  });
});
