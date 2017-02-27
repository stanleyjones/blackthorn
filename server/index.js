import cors from 'cors';
import express from 'express';
import graphql from 'express-graphql';
import path from 'path';
import { text } from 'body-parser';

import config from '../config';
import { schema } from './graphql';

const app = express();
const { host, port } = config[process.env.NODE_ENV || 'development'];

// GraphQL
app.use(text({ type: 'application/graphql' }));
app.use('/ql', cors(), graphql({ schema, pretty: true }));

// Static Server
if (process.env.NODE_ENV !== 'development') {
  app.use(express.static('./build'));
  app.get('/*', (req, res) => { res.sendFile(path.join(__dirname, '../build', 'index.html')); });
}

app.listen(port);

console.log(`
The API is running at:

  ${host}:${port}/
`);
