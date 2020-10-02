'use strict';

const express = require('express');
const app = express();
const port = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT;
const helmet = require('helmet');
const api = require('./api');
const client = require('./client');

// Common middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// View engine (app-wide)
app.set('views', __dirname + '/client/views/');
app.set('view engine', 'ejs');

// Static assets
app.use(express.static('client/public'));

// Client and API Routers
app.use('/api', api);
app.use('/', client);

const listener = app.listen(port || 3000, () => {
  console.log("Listening on port", listener.address().port);
});

module.exports = app; // Export for testing
