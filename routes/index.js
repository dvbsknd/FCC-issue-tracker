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
router.get('/:projectName', (req, res) => {
  listIssues((err, data) => {
    res.resolve(err, data);
  });
});

router.post('/:projectName', (req, res) => {
  createIssue(req.body, (err, data) => {
    res.resolve(err, data);
  });
});

// Unmatched routes
router.use((req, res) => {
  res.resolve('Unmatched route');
});

module.exports = router;
