import { MongoClient as client } from 'mongodb';
import { config } from 'dotenv';

config();

const connect = cb => client.connect(process.env.MONGO_URL, cb);

export default connect;
