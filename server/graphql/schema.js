import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { auth, inviteUser, queryUser, queryUsers, requestPasscode } from './user';
import { createCampaign, deleteCampaign, saveCampaign } from './campaign';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      queryUsers,
      queryUser,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      auth,
      createCampaign,
      deleteCampaign,
      inviteUser,
      requestPasscode,
      saveCampaign,
    },
  }),
});
