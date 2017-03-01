'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inviteUser = exports.auth = exports.requestPasscode = exports.queryUser = exports.queryUsers = exports.updateUser = exports.insertUser = exports.findUser = exports.findUsers = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _mongodb = require('mongodb');

var _jsonwebtoken = require('jsonwebtoken');

var _constants = require('../../constants');

var _mailer = require('../../mailer');

var _helpers = require('../helpers');

var _campaign = require('../campaign');

var _campaign2 = _interopRequireDefault(_campaign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var findUsers = exports.findUsers = function findUsers(query) {
  return (0, _helpers.findAll)('users', query);
};
var findUser = exports.findUser = function findUser(query) {
  return (0, _helpers.findOne)('users', query);
};
var insertUser = exports.insertUser = function insertUser(doc) {
  return (0, _helpers.insertOne)('users', doc);
};
var updateUser = exports.updateUser = function updateUser(query, doc) {
  return (0, _helpers.updateOne)('users', query, doc);
};

var User = new _graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: _graphql.GraphQLID },
    admin: { type: _graphql.GraphQLBoolean },
    campaigns: {
      type: new _graphql.GraphQLList(_campaign2.default),
      resolve: function resolve(_ref) {
        var _id = _ref._id;
        return (0, _campaign.findCampaigns)({ $or: [{ userId: _id }, { playerIds: _id }] });
      }
    },
    email: { type: _graphql.GraphQLString },
    name: { type: _graphql.GraphQLString }
  }
});

exports.default = User;
var queryUsers = exports.queryUsers = {
  type: new _graphql.GraphQLList(User),
  args: {
    email: { type: _graphql.GraphQLString }
  },
  resolve: function resolve(_, args) {
    return findUsers(args);
  }
};

var queryUser = exports.queryUser = {
  type: User,
  args: {
    token: { type: _graphql.GraphQLString }
  },
  resolve: function resolve(_, args) {
    var _verify = (0, _jsonwebtoken.verify)(args.token, _constants.SECRET),
        _id = _verify._id;

    return findUser({ _id: new _mongodb.ObjectId(_id) });
  }
};

var getPasscode = function getPasscode(length) {
  return new Array(length).fill(null).map(function () {
    return Math.floor(Math.random() * 10);
  }).join('');
};

var requestPasscode = exports.requestPasscode = {
  type: _graphql.GraphQLID,
  args: {
    email: { type: _graphql.GraphQLString }
  },
  resolve: function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_, args) {
      var user, _id, passcode;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return findUser(args);

            case 2:
              user = _context.sent;

              if (user) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', null);

            case 5:
              _id = user._id;
              passcode = getPasscode(6);

              updateUser({ _id: _id }, { passcode: passcode });
              (0, _mailer.sendPasscode)(user.email, passcode);
              return _context.abrupt('return', _id);

            case 10:
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

var Auth = new _graphql.GraphQLObjectType({
  name: 'Auth',
  fields: {
    error: { type: _graphql.GraphQLString },
    token: { type: _graphql.GraphQLString }
  }
});

var auth = exports.auth = {
  type: Auth,
  args: {
    id: { type: _graphql.GraphQLID },
    passcode: { type: _graphql.GraphQLString }
  },
  resolve: function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_, args) {
      var _id, passcode, user;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _id = args.id, passcode = args.passcode;
              _context2.next = 3;
              return findUser({ _id: new _mongodb.ObjectId(_id), passcode: passcode });

            case 3:
              user = _context2.sent;

              if (!user) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', { token: (0, _jsonwebtoken.sign)(_extends({}, user), _constants.SECRET) });

            case 6:
              return _context2.abrupt('return', { error: 'user_not_found' });

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function resolve(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }()
};

var inviteUser = exports.inviteUser = {
  type: User,
  args: {
    campaignId: { type: _graphql.GraphQLID },
    email: { type: _graphql.GraphQLString }
  },
  resolve: function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_, _ref5) {
      var campaignId = _ref5.campaignId,
          email = _ref5.email;

      var user, _ref6, insertedId, _user, userId, _ref7, _ref7$playerIds, playerIds;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return findUser({ email: email });

            case 2:
              user = _context3.sent;

              if (user) {
                _context3.next = 12;
                break;
              }

              _context3.next = 6;
              return insertUser({ email: email });

            case 6:
              _ref6 = _context3.sent;
              insertedId = _ref6.insertedId;
              _context3.next = 10;
              return findUser({ _id: new _mongodb.ObjectId(insertedId) });

            case 10:
              user = _context3.sent;

              (0, _mailer.sendInvite)(email);

            case 12:
              if (!campaignId) {
                _context3.next = 20;
                break;
              }

              _user = user, userId = _user._id;
              _context3.next = 16;
              return (0, _campaign.findCampaign)({ _id: new _mongodb.ObjectId(campaignId) });

            case 16:
              _ref7 = _context3.sent;
              _ref7$playerIds = _ref7.playerIds;
              playerIds = _ref7$playerIds === undefined ? [] : _ref7$playerIds;

              (0, _campaign.updateCampaign)({ _id: new _mongodb.ObjectId(campaignId) }, { playerIds: [].concat(_toConsumableArray(playerIds), [userId]) });

            case 20:
              return _context3.abrupt('return', user);

            case 21:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function resolve(_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }()
};