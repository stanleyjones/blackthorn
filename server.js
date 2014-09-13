'use strict';

// APP

var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(bodyParser.urlencoded({extended: true}));

// DATABASE

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blackthorn');

// AUTHENTICATION

var	users = require('./api/routes/users'),
	campaigns = require('./api/routes/campaigns');
//	passport = require('passport'),
// 	HashStrategy = require('passport-hash').Strategy;

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new HashStrategy(function (hash, done) {
// 	users.findByHash(hash, function (err, user) {
// 		if (err) { return done(err); }
// 		if (!user) { return done(null, false, { message: 'Unknown user: ' + user.email }); }
// 		// [TODO] Check hash age (e.g. < 10 minutes)
// 		return done(null, user);
// 	});
// }));

function isAdmin (req, res, next) {
	if (true) { return next(); }
	res.redirect('/login');
}

// API

var router = express.Router();
app.use('/api', router);

router.get('/', function (req, res) { res.json({ status: 'API is running.' }); });
router.get('/users', isAdmin, users.all);
router.get('/users/:id', isAdmin, users.one);

router.get('/campaigns', campaigns.all);
router.get('/campaigns/:id', campaigns.one);

router.post('/users/login', users.login); //function (req, res) { res.json({ status: true }); });
router.get('/users/login/:hash', users.loginHash);

// STATIC

app.use(express.static('public'));
app.get('*', function (req, res) { res.sendFile(__dirname + '/public/index.html'); });

// PORT

var port = process.env.PORT || 9000;
app.listen(port);
console.log('Listening on port ' + port);


// OBSOLETE (Express 3) - remove as replaced with v4 settings

// app.configure(function(){
// 	app.use(express.favicon());
// 	app.use(express.logger('dev'));
// 	app.use(express.bodyParser());
// 	app.use(express.methodOverride());
// 	app.use(express.cookieParser('your secret here'));
// 	app.use(express.session());
// });

// app.configure('development', function(){
// 	app.use(express.errorHandler());
// });

