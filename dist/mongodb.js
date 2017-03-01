'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _mongodb = require('mongodb');

var _dotenv = require('dotenv');

(0, _dotenv.config)();

var connect = exports.connect = function connect(cb) {
  return _mongodb.MongoClient.connect(process.env.MONGO_URL, cb);
};