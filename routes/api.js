'use strict';

const express = require('express');
const api = express.Router();

api.post('/issues/:projectName', (req, res) => {
  console.log(req.headers);
  res.json(req.body);
});

module.exports = api;
