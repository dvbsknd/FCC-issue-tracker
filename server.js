'use strict';

const express = require('express');
const app = express();
const port = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT;
const helmet = require('helmet');
const { responseResolver } = require('./middleware');
const router = require('./routes');

// Common middleware
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives:{
    defaultSrc:["'self'"],
    scriptSrc:["'self'",'code.jquery.com','maxcdn.bootstrapcdn.com','cdnjs.cloudflare.com'],
    styleSrc:["'self'",'maxcdn.bootstrapcdn.com'],
    fontSrc:["'self'",'maxcdn.bootstrapcdn.com']}}));
app.use(express.urlencoded({ extended: true }));

// Identify whether this is a web or API request
// and set the .resolve() method accordingly
app.use(responseResolver);

// View engine (app-wide)
app.set('views', __dirname + '/views/');
app.set('view engine', 'ejs');

// Static assets
app.use(express.static('public'));

// Client and API Routers
app.use('/', router);

const listener = app.listen(port || 3000, () => {
  console.log("Listening on port", listener.address().port);
});

module.exports = app; // Export for testing
