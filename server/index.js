const app = require('express')();
const env = process.env.NODE_ENV || 'development';

// Config

app.env = require('./config/app')[env];

require('./config/express')(app);
require('./config/mongodb')(app);
require('./config/passwordless')(app);
require('./config/router')(app);
require('./config/static')(app);

app.listen(app.env.port);
console.log('listening:', [app.env.host, app.env.port].join(':'));
