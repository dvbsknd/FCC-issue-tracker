'use strict';

const express = require('express');
const router = express.Router();
const {
  createIssue,
  updateIssue,
  listIssues,
  deleteIssue
} = require('../controllers/issuesController');

// Index page
router.get('/', (req, res) => {
  listIssues(null, (err, data) => {
    res.resolve(err, data);
  });
});

// Project page
router.get('/:projectName?', (req, res) => {
  listIssues(req.params.projectName, (err, data) => {
    res.resolve(err, data);
  });
});

router.post('/:projectName', (req, res) => {
  createIssue(req.params.projectName, req.body, (err, data) => {
    res.resolve(err, data);
  });
});

router.put('/:projectName', (req, res) => {
  updateIssue(req.body, (err, data) => {
    res.resolve(err, data);
  });
});

router.delete('/', (req, res) => {
  deleteIssue(req.body.issue_id, (err, data) => {
    res.resolve(err, data);
  });
});

// Unmatched routes
router.use((req, res) => {
  res.resolve('Unknown route');
});

module.exports = router;
