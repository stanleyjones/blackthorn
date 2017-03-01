'use strict';

require('babel-polyfill');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenv = require('dotenv');

var _bodyParser = require('body-parser');

var _graphql = require('./graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

var app = (0, _express2.default)();

// GraphQL
app.use((0, _bodyParser.text)({ type: 'application/graphql' }));
app.use('/ql', (0, _cors2.default)(), (0, _expressGraphql2.default)({ schema: _graphql.schema, pretty: true }));

// Static Server
if (process.env.NODE_ENV !== 'development') {
  app.use(_express2.default.static('./build'));
  app.get('/*', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(Number(process.env.API_PORT));