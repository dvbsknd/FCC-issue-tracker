'use strict';

const express = require('express');
const app = express();
const port = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT;
const helmet = require('helmet');
const api = require('./routes/api');

// Common middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// Says hello
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World.' });
});

app.use('/api', api);

// Handles all unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Unknown route' });
});

const listener = app.listen(port || 3000, () => {
  console.log("Listening on port", listener.address().port);
});

module.exports = app; // Export for testing
