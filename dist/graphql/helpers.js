'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeOne = exports.updateOne = exports.insertOne = exports.findOne = exports.findAll = undefined;

var _mongodb = require('../mongodb');

var promisify = function promisify(operation) {
  return new Promise(function (resolve, reject) {
    (0, _mongodb.connect)(function (err, db) {
      if (err) {
        reject(err);
      }
      operation(db, resolve, reject);
    });
  });
};

var findAll = exports.findAll = function findAll(collection, query) {
  return promisify(function (db, resolve, reject) {
    db.collection(collection).find(query).toArray(function (err, results) {
      if (err) {
        reject(err);
      }
      db.close();
      resolve(results);
    });
  });
};

var findOne = exports.findOne = function findOne(collection, query) {
  return promisify(function (db, resolve) {
    db.collection(collection).findOne(query).then(function (result) {
      db.close();
      resolve(result);
    });
  });
};

var insertOne = exports.insertOne = function insertOne(collection, doc) {
  return promisify(function (db, resolve) {
    db.collection(collection).insertOne(doc).then(function (result) {
      db.close();
      resolve(result);
    });
  });
};

var updateOne = exports.updateOne = function updateOne(collection, query, doc) {
  return promisify(function (db, resolve) {
    db.collection(collection).findOneAndUpdate(query, { $set: doc }, { returnNewDocument: true }).then(function (_ref) {
      var value = _ref.value;

      db.close();
      resolve(value);
    });
  });
};

var removeOne = exports.removeOne = function removeOne(collection, query) {
  return promisify(function (db, resolve) {
    db.collection(collection).remove(query, { justOne: true }).then(function (result) {
      db.close();
      resolve(result);
    });
  });
};