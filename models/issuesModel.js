'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
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

Issue.list = function (project, callback) {
  MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('issues').find({ project_name: project }).toArray((err, result) => {
      assert.equal(null, err);
      assert.ok(result);
      client.close();
      callback(null, result);
    });
  });
};

Issue.find = function (id, callback) {
  MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('issues').findOne({ _id: ObjectID(id) }, (err, result) => {
      assert.equal(null, err);
      assert.ok(result);
      client.close();
      callback(null, result);
    });
  });
};

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

Issue.update = function (id, data, callback) {
  MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const issue_title = data.issue_title;
    db.collection('issues').findOneAndUpdate({ _id: ObjectID(id) }, { $set : { issue_title } }, { returnOriginal: false }, (err, result) => {
      assert.equal(null, err);
      assert.equal(1, result.ok);
      client.close();
      callback(null, result.value);
    });
  });
};
module.exports = Issue;
