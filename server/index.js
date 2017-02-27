import cors from 'cors';
import express from 'express';
import graphql from 'express-graphql';
import path from 'path';
import { config } from 'dotenv';
import { text } from 'body-parser';

import { schema } from './graphql';

config();

const app = express();

// GraphQL
app.use(text({ type: 'application/graphql' }));
app.use('/ql', cors(), graphql({ schema, pretty: true }));

// Static Server
if (process.env.NODE_ENV !== 'development') {
  app.use(express.static('./build'));
  app.get('/*', (req, res) => { res.sendFile(path.join(__dirname, '../build', 'index.html')); });
}

app.listen(process.env.API_PORT);
