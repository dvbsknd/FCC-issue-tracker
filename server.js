'use strict';

const express = require('express');
const app = express();
const helmet = require('helmet');

// Set some safe headers
app.use(helmet());

// Says hello
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World.' });
});

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

// Handles all unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Unknown route' });
});

const listener = app.listen(process.env.PORT || 3001, () => {
  console.log("Listening on port", listener.address().port);
});

module.exports = app; // Export for testing
