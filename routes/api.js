'use strict';

const express = require('express');
const api = express.Router();

const requiredFields = ['issue_title', 'issue_text', 'created_by'];
const optionalFields = ['assigned_to', 'status_text'];

api.post('/issues/:projectName', (req, res) => {
  if (requiredFields.every(field => req.body[field])) res.json(req.body);
  else res.status(400).json({ error: 'Missing required fields' });
});

module.exports = api;
