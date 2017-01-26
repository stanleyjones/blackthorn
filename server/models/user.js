import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { ObjectId } from 'mongodb';
import { sign, verify } from 'jsonwebtoken';

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
      resolve: ({ _id }) => findCampaigns({ userId: _id }),
    },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
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
    token: { type: GraphQLString },
  },
  resolve: (_, args) => {
    const { _id } = verify(args.token, SECRET);
    return findUser({ _id: new ObjectId(_id) });
  },
};

export const authUser = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { _id } = await findUser(args);
    return sign({ _id }, SECRET);
  },
};
