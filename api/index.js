const app = require('./app');
const db = require('./db');

const DB_NAME = 'blackthorn';
const DB_PORT = 27017;

db.connect(DB_NAME, DB_PORT);
console.log(`DB is connected on port ${DB_PORT}...`)

const API_PORT = 3000;

app.listen(API_PORT);
console.log(`API listening on port ${API_PORT}...`);
