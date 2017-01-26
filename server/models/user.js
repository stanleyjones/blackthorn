import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { sign } from 'jsonwebtoken';

import { SECRET } from '../constants';

import { findAll, findOne, updateOne } from './helpers';
import Campaign, { findCampaigns } from './campaign';

export const findUsers = query => findAll('users', query);
export const findUser = query => findOne('users', query);
export const updateUser = (query, doc) => updateOne('users', query, doc);

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLID },
    admin: { type: GraphQLBoolean },
    campaigns: {
      type: new GraphQLList(Campaign),
      resolve: ({ _id: userId }) => findCampaigns({ userId }),
    },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    token: { type: GraphQLString },
  },
});

export const queryUsers = {
  type: new GraphQLList(User),
  args: {
    email: { type: GraphQLString },
  },
  resolve: (_, args) => findUsers(args),
};

export const queryUser = {
  type: User,
  args: {
    email: { type: GraphQLString },
  },
  resolve: (_, args) => findUser(args),
};

export const authUser = {
  type: User,
  args: {
    email: { type: GraphQLString },
    admin: { type: GraphQLBoolean },
  },
  resolve: (_, args) => updateUser(args, {
    token: sign(args, SECRET),
  }, { new: true }),
};
