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

export const requestPasscode = {
  type: GraphQLID,
  args: {
    email: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const user = await findUser(args);
    if (!user) { return null; }
    const { _id } = user;
    updateUser({ _id }, { passcode: '12345' });
    return _id;
  },
};

const Auth = new GraphQLObjectType({
  name: 'Auth',
  fields: {
    error: { type: GraphQLString },
    token: { type: GraphQLString },
  },
});

export const auth = {
  type: Auth,
  args: {
    id: { type: GraphQLID },
    passcode: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { id: _id, passcode } = args;
    const user = await findUser({ _id: new ObjectId(_id), passcode });
    if (user) { return { token: sign({ ...user }, SECRET) }; }
    return { error: 'user_not_found' };
  },
};
