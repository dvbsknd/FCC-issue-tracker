'use strict';

const express = require('express');
const app = express();
const helmet = require('helmet');

// Common middleware
app.use(helmet());
app.use(express.urlencoded());

// Says hello
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World.' });
});

app.post('/api/issues/:projectName', (req, res) => {
  res.json(req.body);
});

// Handles all unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Unknown route' });
});

const listener = app.listen(process.env.PORT || 3001, () => {
  console.log("Listening on port", listener.address().port);
});

module.exports = app; // Export for testing
