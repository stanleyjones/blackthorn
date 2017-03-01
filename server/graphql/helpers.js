import { connect } from '../mongodb';

const promisify = operation => new Promise((resolve, reject) => {
  connect((err, db) => {
    if (err) { reject(err); }
    operation(db, resolve, reject);
  });
});

export const findAll = (collection, query) => promisify((db, resolve, reject) => {
  db.collection(collection)
    .find(query)
    .toArray((err, results) => {
      if (err) { reject(err); }
      db.close();
      resolve(results);
    });
});

export const findOne = (collection, query) => promisify((db, resolve) => {
  db.collection(collection)
    .findOne(query)
    .then(result => {
      db.close();
      resolve(result);
    });
});

export const insertOne = (collection, doc) => promisify((db, resolve) => {
  db.collection(collection)
    .insertOne(doc)
    .then(result => {
      db.close();
      resolve(result);
    });
});

export const updateOne = (collection, query, doc) => promisify((db, resolve) => {
  db.collection(collection)
    .findOneAndUpdate(query, { $set: doc }, { returnNewDocument: true })
    .then(({ value }) => {
      db.close();
      resolve(value);
    });
});

export const removeOne = (collection, query) => promisify((db, resolve) => {
  db.collection(collection)
    .remove(query, { justOne: true })
    .then(result => {
      db.close();
      resolve(result);
    });
});
