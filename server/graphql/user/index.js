import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { ObjectId } from 'mongodb';
import { sign, verify } from 'jsonwebtoken';

import { SECRET } from '../../constants';
import { sendInvite, sendPasscode } from '../../mailer';

import { findAll, findOne, insertOne, updateOne } from '../helpers';
import Campaign, { findCampaign, findCampaigns, updateCampaign } from '../campaign';

export const findUsers = query => findAll('users', query);
export const findUser = query => findOne('users', query);
export const insertUser = doc => insertOne('users', doc);
export const updateUser = (query, doc) => updateOne('users', query, doc);

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLID },
    admin: { type: GraphQLBoolean },
    campaigns: {
      type: new GraphQLList(Campaign),
      resolve: ({ _id }) => findCampaigns({ $or: [{ userId: _id }, { playerIds: _id }] }),
    },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

export default User;

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

const getPasscode = length => new Array(length)
  .fill(null)
  .map(() => Math.floor(Math.random() * 10))
  .join('');

export const requestPasscode = {
  type: GraphQLID,
  args: {
    email: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const user = await findUser(args);
    if (!user) { return null; }
    const { _id } = user;
    const passcode = getPasscode(6);
    updateUser({ _id }, { passcode });
    sendPasscode(user.email, passcode);
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

export const inviteUser = {
  type: User,
  args: {
    email: { type: GraphQLString },
    campaignId: { type: GraphQLID },
  },
  resolve: async (_, args) => {
    const { campaignId, email } = args;
    const user = await findUser({ email });
    let { _id: userId } = user;
    if (!userId) {
      const { insertedId } = await insertUser({ email });
      userId = insertedId;
      sendInvite(email);
    }
    if (campaignId && userId) {
      const campaign = await findCampaign({ _id: new ObjectId(campaignId) });
      updateCampaign(campaign, { playerIds: [...campaign.playerIds, userId] });
    }
    return user;
  },
};
