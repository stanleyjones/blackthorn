import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

import { findAll, findOne, setOne } from './helpers';

export const findCampaigns = query => findAll('campaigns', query);
export const findCampaign = query => findOne('campaigns', query);
export const setCampaign = (query, doc) => setOne('campaigns', query, doc);

const Campaign = new GraphQLObjectType({
  name: 'Campaign',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    userId: { type: GraphQLID },
  },
});

export default Campaign;
