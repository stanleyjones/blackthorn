import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { auth, queryUser, queryUsers, requestPasscode } from './user';
import { saveCampaign } from './campaign';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      queryUsers,
      queryUser,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      auth,
      requestPasscode,
      saveCampaign,
    },
  }),
});
