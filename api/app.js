const express = require('express');
const BodyParser = require('body-parser');

const users = require('./users/controller');
const games = require('./games/controller');

const app = express();

app.use(BodyParser.json());

app.get('/', (_, res) => res.status(200).json());
app.use('/users', users);
app.use('/games', games);

module.exports = app;