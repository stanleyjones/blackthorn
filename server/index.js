import express from 'express';
import graphql from 'express-graphql';
import path from 'path';
import { text } from 'body-parser';

import config from '../config.json';

import { schema } from './graphql';

const app = express();
app.env = config[process.env.NODE_ENV || 'development'];

// GraphQL
app.use(text({ type: 'application/graphql' }));
app.use('/ql', graphql({ schema, pretty: true }));

// Static Server
app.get(/.*\.js/, express.static('public'));
app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, '../public/index.html')); });

app.listen(app.env.port);
console.log(`listening: ${app.env.host}:${app.env.port}`);
