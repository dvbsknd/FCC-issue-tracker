'use strict';

const express = require('express');
const router = express.Router();
const { createIssue, listIssues } = require('../controllers/issuesController');

// Index page
router.get('/', (req, res) => {
  listIssues((err, data) => {
    res.resolve(err, data);
  });
});

// Project page
router.get('/issues/:projectName', (req, res) => {
  listIssues((err, data) => {
    res.resolve(err, data);
  });
});

router.post('/issues/:projectName', (req, res) => {
  createIssue(req.body, (err, data) => {
    res.resolve(err, data);
  });
});

// Unmatched routes
router.use((req, res) => {
  res.resolve('Unknown route');
});

module.exports = router;
