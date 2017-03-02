import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { ObjectId } from 'mongodb';

import { findAll, findOne, insertOne, updateOne, removeOne } from './helpers';
import Character, { findMany as findCharacters } from './character';
import User, { findUsers } from './user';

export const findCampaigns = query => findAll('campaigns', query);
export const findCampaign = query => findOne('campaigns', query);
export const updateCampaign = (query, doc) => updateOne('campaigns', query, doc);
export const insertCampaign = doc => insertOne('campaigns', doc);
export const removeCampaign = query => removeOne('campaigns', query);

const campaignDefaults = {
  name: 'My New Campaign',
  playerIds: [],
  userId: null,
};

const Campaign = new GraphQLObjectType({
  name: 'Campaign',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    characters: {
      type: new GraphQLList(Character),
      resolve: ({ _id }) => findCharacters({ campaignId: _id }),
    },
    players: {
      type: new GraphQLList(User),
      resolve: ({ playerIds }) => findUsers({ _id: { $in: playerIds } }) || [],
    },
    userId: { type: GraphQLID },
  }),
});

export default Campaign;

const CampaignInput = new GraphQLInputObjectType({
  name: 'CampaignInput',
  fields: {
    name: { type: GraphQLString },
    playerIds: { type: new GraphQLList(GraphQLID) },
  },
});

export const createCampaign = {
  type: new GraphQLList(Campaign),
  args: {
    userId: { type: GraphQLID },
  },
  resolve: async (_, args) => {
    const userId = new ObjectId(args.userId);
    await insertCampaign({ ...campaignDefaults, userId });
    return findCampaigns({ userId });
  },
};

export const saveCampaign = {
  type: new GraphQLList(Campaign),
  args: {
    campaignId: { type: GraphQLID },
    attrs: { type: CampaignInput },
  },
  resolve: async (_, { campaignId, attrs }) => {
    const userId = new ObjectId(attrs.userId);
    await updateCampaign({ _id: new ObjectId(campaignId) }, attrs);
    return findCampaigns({ userId });
  },
};

export const deleteCampaign = {
  type: new GraphQLList(Campaign),
  args: {
    campaignId: { type: GraphQLID },
  },
  resolve: async (_, { campaignId }) => {
    const _id = new ObjectId(campaignId);
    const campaign = await findCampaign({ _id });
    await removeCampaign({ _id });
    return findCampaigns({ userId: campaign.userId });
  },
};
