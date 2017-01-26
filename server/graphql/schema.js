import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { authUser, queryUser, queryUsers } from '../models/user';
import { saveCampaign } from '../models/campaign';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: queryUsers,
      user: queryUser,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      auth: authUser,
      saveCampaign,
    },
  }),
});
