import { MongoClient as client } from 'mongodb';

import getConfig from '../../src/config';

const { mongodb } = getConfig();
export const connect = cb => client.connect(mongodb, cb);
