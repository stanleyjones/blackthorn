const config = {
  development: {
    host: 'http://localhost',
    mongodb: 'mongodb://localhost/blackthorn',
    port: 3001,
  },
  production: {
    host: 'http://blackthorn.sunshocked.com',
    mongodb: 'mongodb://localhost/blackthorn',
    port: 9000,
  },
};

export default config;
