'use strict';

const express = require('express');
const api = express.Router();
const { createIssue } = require('../controllers/issuesController');

api.post('/issues/:projectName', (req, res) => {
  createIssue(req.body, (err, data) => {
    if (err) res.status(400).json({ error: err });
    else res.json(data);
  });
});

module.exports = api;
