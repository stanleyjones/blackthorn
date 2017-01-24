import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { sign } from 'jsonwebtoken';

import { SECRET } from '../constants';
import userType from './userType';
import User from '../models/user';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: userType,
        args: {
          email: { type: GraphQLString },
        },
        resolve: (_, args) => User.findOne(args),
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      auth: {
        type: userType,
        args: {
          email: { type: GraphQLString },
          admin: { type: GraphQLBoolean },
        },
        resolve: (_, args) => User.findOneAndUpdate(args, {
          token: sign(args, SECRET),
        }, { new: true }),
      },
    },
  }),
});
