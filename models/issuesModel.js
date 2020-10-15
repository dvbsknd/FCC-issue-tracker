'use strict';

const Database = require('../utils/database');
const issuesStore = new Database('issues');

function Issue (data) {
  const requiredFields = ['project_id', 'issue_title', 'issue_text', 'created_by'];
  const optionalFields = ['assigned_to', 'status_text'];
  const validFields = requiredFields.concat(optionalFields);
  if (data.project_id) data.project_id = new issuesStore.ObjectID(data.project_id);
  if (requiredFields.every(field => data[field])) {
    validFields.forEach(field => this[field] = data[field]);
  } else throw new Error('Invalid issue data provided');
}

Issue.list = function (project, callback) {
  const filter = project !== null ? { project_id: issuesStore.ObjectID(project._id) } : {};
  issuesStore.connect(db => {
    db.find(filter).toArray((err, result) => {
      if (err) callback(err);
      else callback(null, result);
    });
  });
};

Issue.find = function (id, callback) {
  issuesStore.connect(db => {
    db.findOne({ _id: issuesStore.ObjectID(id) }, (err, result) => {
      if (err) callback(err);
      else callback(null, result);
    });
  });
};

Issue.prototype.save = function (callback) {
  issuesStore.connect(db => {
    db.insertOne(this, (err, result) => {
      if (err) callback(err);
      else callback(null, result.ops[0]);
    });
  });
};

Issue.update = function (id, data, callback) {
  const issue_title = data.issue_title;
  issuesStore.connect(db => {
    db.findOneAndUpdate({ _id: issuesStore.ObjectID(id) }, { $set : { issue_title } }, { returnOriginal: false }, (err, result) => {
      if (err) callback(err);
      else callback(null, result);
    });
  });
};

module.exports = Issue;
