import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { auth, inviteUser, queryUser, queryUsers, requestPasscode } from './user';
import { createCampaign, deleteCampaign, saveCampaign } from './campaign';
import { createCharacter, deleteCharacter, queryCharacter, saveCharacter } from './character';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      queryCharacter,
      queryUser,
      queryUsers,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      auth,
      createCampaign,
      createCharacter,
      deleteCampaign,
      deleteCharacter,
      inviteUser,
      requestPasscode,
      saveCampaign,
      saveCharacter,
    },
  }),
});
