const getConfig = () => {
  const environment = process.env.NODE_ENV || 'development';
  switch (environment) {

    case 'production':
      return {
        host: 'http://blackthorn.sunshocked.com',
        mongodb: 'mongodb://localhost/blackthorn',
        port: 9000,
      };

    case 'development':
    default:
      return {
        host: 'http://localhost',
        mongodb: 'mongodb://localhost/blackthorn',
        port: 3001,
      };
  }
};

export default getConfig;
