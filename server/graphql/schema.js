import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { authUser, queryUser, queryUsers } from '../models/user';
import { saveCampaign } from '../models/campaign';

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
      authUser,
      saveCampaign,
    },
  }),
});
