import express from 'express';
import graphql from 'express-graphql';
import path from 'path';
import { text } from 'body-parser';

import { host, port } from '../config';

import { schema } from './graphql';

const app = express();

// GraphQL
app.use(text({ type: 'application/graphql' }));
app.use('/ql', graphql({ schema, pretty: true }));

// Static Server
app.get(/.*\.js/, express.static('public'));
app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, '../public/index.html')); });

app.listen(port);
console.log(`listening: ${host}:${port}`);
