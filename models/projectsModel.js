'use strict';

const MongoClient = require('mongodb').MongoClient;
const dbName = process.env.NODE_ENV === 'test' ? process.env.MONGO_DATABASE_TEST : process.env.MONGO_DATABASE;
const assert = require('assert');

function Project (data) {
  const requiredFields = ['project_name'];
  const optionalFields = [];
  const validFields = requiredFields.concat(optionalFields);
  if (requiredFields.every(field => data[field])) {
    validFields.forEach(field => this[field] = data[field]);
  } else throw new Error('Invalid project data provided');
}

Project.prototype.findOrCreate = function (name, callback) {
  MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    console.log('Hey');
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('projects').findAndModify({ project_name: name }, [], { $setOnInsert: { project_name: name } }, { new: true, upsert: true }, (err, result) => {
      assert.equal(null, err);
      assert.ok(result);
      client.close();
      callback(null, result);
    });
  });
};
