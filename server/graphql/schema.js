import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { authUser, queryUser, queryUsers } from '../models/user';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: queryUsers,
      user: queryUser,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      auth: authUser,
    },
  }),
});
