'use strict';

const express = require('express');
const api = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbName = process.env.NODE_ENV === 'test' ? process.env.MONGO_DATABASE_TEST : process.env.MONGO_DATABASE;
const assert = require('assert');
const requiredFields = ['issue_title', 'issue_text', 'created_by'];
const optionalFields = ['assigned_to', 'status_text'];


api.post('/issues/:projectName', (req, res) => {
  if (requiredFields.every(field => req.body[field])) {
    const validFields = requiredFields.concat(optionalFields);
    const issue = {};
    validFields.forEach(field => issue[field] = req.body[field]);
    MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
      assert.equal(null, err);
      const db = client.db(dbName);
      db.collection('issues').insertOne(issue, (err, result) => {
        assert.equal(null, err);
        assert.equal(1, result.result.ok);
        client.close();
        res.json(result.ops[0]);
      });
    });
  }
  else res.status(400).json({ error: 'Missing required fields' });
});

module.exports = api;
