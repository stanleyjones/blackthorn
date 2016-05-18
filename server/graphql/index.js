import graphql from 'express-graphql';
import { text } from 'body-parser';

import schema from './schema';

module.exports = (app) => {
  app.use(text({ type: 'application/graphql' }));
  app.use('/ql', graphql({ schema, pretty: true }));
};
