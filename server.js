'use strict';

const express = require('express');
const app = express();

app.use('/', (req, res) => {
  res.json({ message: 'Hello, World.' });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port", listener.address().port);
});

module.exports = app; // Export for testing
