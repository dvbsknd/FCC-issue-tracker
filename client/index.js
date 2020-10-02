'use strict';

const express = require('express');
const client = express.Router();

// Index page
client.get('/', (req, res) => {
    res.render('index');
});

// Handles all unmatched routes
client.use((req, res) => {
  res.status(404).send('404 Error');
});

module.exports = client;
