import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLString },
    admin: { type: GraphQLBoolean },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    token: { type: GraphQLString },
  },
});
