import express from 'express';

import config from '../config.json';

import useGraphQL from './graphql';
import useExpress from './express';
import useMongoDB from './express/mongodb';

const app = express();
app.env = config[process.env.NODE_ENV || 'development'];

useGraphQL(app);
useExpress(app);
useMongoDB(app);

// require('./config/passwordless')(app);
// require('./config/router')(app);

app.listen(app.env.port);
console.log(`listening: ${app.env.host}:${app.env.port}`);
