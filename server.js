'use strict';

var app = require('express')(),
	env = process.env.NODE_ENV || 'development';

// Config

app.env = require('./server/config/app')[env];

require('./server/config/express')(app);
require('./server/config/mongodb')(app);
require('./server/config/passwordless')(app);
require('./server/config/router')(app);
require('./server/config/static')(app);

app.listen(app.env.port);
console.log('listening:', [app.env.host, app.env.port].join(':'));