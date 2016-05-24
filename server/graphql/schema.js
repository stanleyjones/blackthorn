import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import userType from './userType';
import Users from '../models/user';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      users: {
        type: new GraphQLList(userType),
        resolve: () => Users.find(),
      },
      user: {
        type: userType,
        args: {
          admin: { type: GraphQLBoolean },
          email: { type: GraphQLString },
        },
        resolve: (_, args) => Users.findOne(args),
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      changeName: {
        type: userType,
        args: {
          id: { type: GraphQLString },
          name: { type: GraphQLString },
        },
        resolve: () => {},
      },
    },
  }),
});
