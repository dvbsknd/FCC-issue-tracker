'use strict';

const express = require('express');
const api = express.Router();
const { createIssue, listIssues } = require('./controllers/issuesController');

api.post('/issues/:projectName', (req, res) => {
  createIssue(req.body, (err, data) => {
    if (err) res.status(400).json({ error: err });
    else res.json(data);
  });
});

api.get('/issues/:projectName', (req, res) => {
  listIssues((err, data) => {
    if (err) res.status(400).json({ error: err });
    else res.json(data);
  });
});
// Handles all unmatched routes
api.use((req, res) => {
  res.status(404).json({ error: 'Unknown route' });
});

module.exports = api;
