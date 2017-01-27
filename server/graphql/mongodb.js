import { MongoClient as client } from 'mongodb';

import { mongodb } from '../../config';

export const connect = cb => client.connect(mongodb, cb);
