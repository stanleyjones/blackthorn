'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCampaign = exports.saveCampaign = exports.removeCampaign = exports.insertCampaign = exports.updateCampaign = exports.findCampaign = exports.findCampaigns = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _mongodb = require('mongodb');

var _helpers = require('./helpers');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var findCampaigns = exports.findCampaigns = function findCampaigns(query) {
  return (0, _helpers.findAll)('campaigns', query);
};
var findCampaign = exports.findCampaign = function findCampaign(query) {
  return (0, _helpers.findOne)('campaigns', query);
};
var updateCampaign = exports.updateCampaign = function updateCampaign(query, doc) {
  return (0, _helpers.updateOne)('campaigns', query, doc);
};
var insertCampaign = exports.insertCampaign = function insertCampaign(doc) {
  return (0, _helpers.insertOne)('campaigns', doc);
};
var removeCampaign = exports.removeCampaign = function removeCampaign(query) {
  return (0, _helpers.removeOne)('campaigns', query);
};

var Campaign = new _graphql.GraphQLObjectType({
  name: 'Campaign',
  fields: function fields() {
    return {
      _id: { type: _graphql.GraphQLID },
      name: { type: _graphql.GraphQLString },
      players: {
        type: new _graphql.GraphQLList(_user2.default),
        resolve: function resolve(_ref) {
          var playerIds = _ref.playerIds;
          return (0, _user.findUsers)({ _id: { $in: playerIds } }) || [];
        }
      },
      userId: { type: _graphql.GraphQLID }
    };
  }
});

exports.default = Campaign;


var CampaignInput = new _graphql.GraphQLInputObjectType({
  name: 'CampaignInput',
  fields: {
    _id: { type: _graphql.GraphQLID },
    name: { type: _graphql.GraphQLString },
    playerIds: { type: new _graphql.GraphQLList(_graphql.GraphQLID) },
    userId: { type: _graphql.GraphQLID }
  }
});

var saveCampaign = {
  type: new _graphql.GraphQLList(Campaign),
  args: {
    input: { type: CampaignInput }
  },
  resolve: function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_, args) {
      var _args$input, _id, attrs, campaignId, userId;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _args$input = args.input, _id = _args$input._id, attrs = _objectWithoutProperties(_args$input, ['_id']);
              campaignId = new _mongodb.ObjectId(_id);
              userId = new _mongodb.ObjectId(attrs.userId);

              if (_id) {
                updateCampaign({ _id: campaignId }, _extends({}, attrs, { userId: userId }));
              } else {
                insertCampaign(_extends({}, attrs, { userId: userId, playerIds: [] }));
              }
              return _context.abrupt('return', findCampaigns({ userId: userId }));

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function resolve(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }()
};

exports.saveCampaign = saveCampaign;
var deleteCampaign = {
  type: new _graphql.GraphQLList(Campaign),
  args: {
    input: { type: CampaignInput }
  },
  resolve: function resolve(_, args) {
    var _args$input2 = args.input,
        _id = _args$input2._id,
        attrs = _objectWithoutProperties(_args$input2, ['_id']);

    var campaignId = new _mongodb.ObjectId(_id);
    var userId = new _mongodb.ObjectId(attrs.userId);
    removeCampaign({ _id: campaignId });
    return findCampaigns({ userId: userId });
  }
};
exports.deleteCampaign = deleteCampaign;