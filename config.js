const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    host: 'http://localhost',
    mongodb: 'mongodb://localhost/blackthorn',
    port: 9000,
  },
};

export const { host, mongodb, port } = config[env];
