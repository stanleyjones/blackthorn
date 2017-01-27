import { MongoClient as client } from 'mongodb';

import config from '../../config.json';

const environment = process.env.NODE_ENV || 'development';
const url = config[environment].db;

export const connect = cb => client.connect(url, cb);
