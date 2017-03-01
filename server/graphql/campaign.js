import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { ObjectId } from 'mongodb';

import { findAll, findOne, insertOne, updateOne, removeOne } from './helpers';
import User, { findUsers } from './user';

export const findCampaigns = query => findAll('campaigns', query);
export const findCampaign = query => findOne('campaigns', query);
export const updateCampaign = (query, doc) => updateOne('campaigns', query, doc);
export const insertCampaign = doc => insertOne('campaigns', doc);
export const removeCampaign = query => removeOne('campaigns', query);

const Campaign = new GraphQLObjectType({
  name: 'Campaign',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
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
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    playerIds: { type: new GraphQLList(GraphQLID) },
    userId: { type: GraphQLID },
  },
});

export const saveCampaign = {
  type: new GraphQLList(Campaign),
  args: {
    input: { type: CampaignInput },
  },
  resolve: async (_, args) => {
    const { _id, ...attrs } = args.input;
    const campaignId = new ObjectId(_id);
    const userId = new ObjectId(attrs.userId);
    if (_id) {
      updateCampaign({ _id: campaignId }, { ...attrs, userId });
    } else {
      insertCampaign({ ...attrs, userId, playerIds: [] });
    }
    return findCampaigns({ userId });
  },
};

export const deleteCampaign = {
  type: new GraphQLList(Campaign),
  args: {
    input: { type: CampaignInput },
  },
  resolve: (_, args) => {
    const { _id, ...attrs } = args.input;
    const campaignId = new ObjectId(_id);
    const userId = new ObjectId(attrs.userId);
    removeCampaign({ _id: campaignId });
    return findCampaigns({ userId });
  },
};
