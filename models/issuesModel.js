'use strict';

const MongoClient = require('mongodb').MongoClient;
const dbName = process.env.NODE_ENV === 'test' ? process.env.MONGO_DATABASE_TEST : process.env.MONGO_DATABASE;
const assert = require('assert');

function Issue (data) {
  const requiredFields = ['issue_title', 'issue_text', 'created_by'];
  const optionalFields = ['assigned_to', 'status_text'];
  const validFields = requiredFields.concat(optionalFields);
  if (requiredFields.every(field => data[field])) {
    validFields.forEach(field => this[field] = data[field]);
  } else throw new Error('Invalid issue data provided');
}

Issue.prototype.save = function (callback) {
  MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('issues').insertOne(this, (err, result) => {
      assert.equal(null, err);
      assert.equal(1, result.result.ok);
      client.close();
      callback(null, result.ops[0]);
    });
  });
};

module.exports = Issue;
