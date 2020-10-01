'use strict';

const express = require('express');
const api = express.Router();
const Issue = require('../models/issues');

api.post('/issues/:projectName', (req, res) => {
  const issue = new Issue();
  if (issue.requiredFields.every(field => req.body[field])) {
    issue.validFields.forEach(field => issue.data[field] = req.body[field]);
    issue.save(res);
  }
  else res.status(400).json({ error: 'Missing required fields' });
});

module.exports = api;
