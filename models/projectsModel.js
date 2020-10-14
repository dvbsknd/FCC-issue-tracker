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

Project.find = function (projectName, callback) {
  MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const projects = db.collection('projects');
    projects.findOne({ project_name: projectName }, {}, (err, result) => {
      try {
        assert.equal(null, err);
      } catch(err) {
        callback(err);
      }
      client.close();
      if (!result) callback(new Error('Project not found'));
      else {
        callback(null, result);
      }
    });
  });
};

Project.prototype.findOrCreate = function (callback) {
  MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const projects = db.collection('projects');
    projects.findOneAndUpdate({ project_name: this.project_name }, { $setOnInsert: { project_name: this.project_name } }, 
      { upsert: true,
        returnOriginal: false,
        returnNewDocument: true
      }, (err, result) => {
        assert.equal(null, err);
        assert.ok(result);
        client.close();
        callback(null, result);
      });

  });
};

module.exports = Project;
