'use strict';

const express = require('express');
const client = express.Router();
const { listIssues } = require('../api/controllers/issuesController');

// Index page
client.get('/', (req, res) => {
  listIssues((error, issues) => {
    if (error) res.render('index', { error });
    res.render('index', { issues });
  });
});

// Handles all unmatched routes
client.use((req, res) => {
  res.status(404).send('404 Error');
});

module.exports = client;
