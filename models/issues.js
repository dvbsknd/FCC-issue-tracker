'use strict';

const MongoClient = require('mongodb').MongoClient;
const dbName = process.env.NODE_ENV === 'test' ? process.env.MONGO_DATABASE_TEST : process.env.MONGO_DATABASE;
const assert = require('assert');

function Issue () {
  this.requiredFields = ['issue_title', 'issue_text', 'created_by'];
  this.optionalFields = ['assigned_to', 'status_text'];
  this.validFields = this.requiredFields.concat(this.optionalFields);
  this.data = {};
}

Issue.prototype.save = function (res) {
  MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('issues').insertOne(this.data, (err, result) => {
      assert.equal(null, err);
      assert.equal(1, result.result.ok);
      client.close();
      res.json(result.ops[0]);
    });
  });
};

module.exports = Issue;
