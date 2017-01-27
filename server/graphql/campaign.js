import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { ObjectId } from 'mongodb';

import { findAll, findOne, insertOne, updateOne } from './helpers';

export const findCampaigns = query => findAll('campaigns', query);
export const findCampaign = query => findOne('campaigns', query);
export const updateCampaign = (query, doc) => updateOne('campaigns', query, doc);
export const insertCampaign = doc => insertOne('campaigns', doc);

const Campaign = new GraphQLObjectType({
  name: 'Campaign',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    userId: { type: GraphQLID },
  },
});

const CampaignInput = new GraphQLInputObjectType({
  name: 'CampaignInput',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    userId: { type: GraphQLID },
  },
});

export default Campaign;

export const saveCampaign = {
  type: new GraphQLList(Campaign),
  args: {
    input: { type: CampaignInput },
  },
  resolve: (_, args) => {
    const { _id, ...attrs } = args.input;
    const userId = new ObjectId(attrs.userId);
    if (_id) {
      updateCampaign({ _id }, { ...attrs, userId });
    } else {
      insertCampaign({ ...attrs, userId });
    }
    return findCampaigns({ userId });
  },
};