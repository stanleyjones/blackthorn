import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import Campaign, { findCampaign } from '../campaign';
import User, { findUser } from '../user';
import { id, makeMethods } from '../helpers';

export const { findOne, findMany, updateOne, insertOne, removeOne } = makeMethods('characters');

const characterDefaults = {
  name: 'New Character',
  campaignId: null,
  userId: null,
};

const Character = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    campaign: { type: Campaign, resolve: ({ campaignId }) => findCampaign({ _id: campaignId }) },
    description: { type: GraphQLString },
    id: { type: GraphQLID, resolve: ({ _id }) => _id },
    name: { type: GraphQLString },
    player: { type: User, resolve: ({ userId }) => findUser({ _id: userId }) },
  }),
});

export default Character;

const CharacterInput = new GraphQLInputObjectType({
  name: 'CharacterInput',
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

export const createCharacter = {
  type: Character,
  args: {
    campaignId: { type: GraphQLID },
    userId: { type: GraphQLID },
  },
  resolve: async (_, { campaignId, userId }) => {
    const { insertedId } = await insertOne({
      ...characterDefaults,
      campaignId: id(campaignId),
      userId: id(userId),
    });
    return findOne({ userId: insertedId });
  },
};

export const saveCharacter = {
  type: Character,
  args: {
    characterId: { type: GraphQLID },
    attrs: { type: CharacterInput },
  },
  resolve: async (_, { characterId, attrs }) => {
    const _id = id(characterId);
    return updateOne({ _id }, attrs);
  },
};

export const deleteCharacter = {
  type: GraphQLBoolean,
  args: {
    characterId: { type: GraphQLID },
  },
  resolve: async (_, { characterId }) => {
    const _id = id(characterId);
    const { nRemoved } = await removeOne({ _id });
    return nRemoved === 1;
  },
};
