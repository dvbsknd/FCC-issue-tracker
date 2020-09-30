'use strict';

const express = require('express');
const app = express();

app.post('/api/issues/:projectName', (req, res) => {
  const testIssue = {
    issue_title: 'Test issue',
    issue_text: 'This is a test issue',
    created_by: 'Mocha',
    assigned_to: 'Mocha',
    status_text: 'New'
  };
  res.json(testIssue);
});

app.use('/', (req, res) => {
  res.json({ message: 'Hello, World.' });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port", listener.address().port);
});

module.exports = app; // Export for testing
