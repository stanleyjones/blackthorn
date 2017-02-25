import { MongoClient as client } from 'mongodb';

import config from '../../config';

const { mongodb } = config[process.env.NODE_ENV || 'development'];
export const connect = cb => client.connect(mongodb, cb);
