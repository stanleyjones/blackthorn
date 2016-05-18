import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

import userType from './userType';

const data = {
  1: { id: 1, name: 'Stanley' },
};

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: (_, args) => data[args.id],
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      changeName: {
        type: userType,
        args: {
          id: { type: GraphQLString },
          name: { type: GraphQLString },
        },
        resolve: (_, args) => {
          data[args.id].name = args.name;
          return data[args.id];
        },
      },
    },
  }),
});
