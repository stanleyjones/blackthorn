'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _user = require('./user');

var _campaign = require('./campaign');

exports.default = new _graphql.GraphQLSchema({
  query: new _graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      queryUsers: _user.queryUsers,
      queryUser: _user.queryUser
    }
  }),
  mutation: new _graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      auth: _user.auth,
      deleteCampaign: _campaign.deleteCampaign,
      inviteUser: _user.inviteUser,
      requestPasscode: _user.requestPasscode,
      saveCampaign: _campaign.saveCampaign
    }
  })
});