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
  const pipeline = [
    { $match: filter },
    { $lookup: { from: 'projects', localField: 'project_id', foreignField: '_id', as: 'project' } },
    { $unwind: '$project' },
    { $project: {
      _id: 1,
      issue_title: 1,
      issue_text: 1,
      created_by: 1,
      assigned_to: 1,
      status_text: 1,
      project: '$project.project_name' }
    }
  ];
  issuesStore.connect(db => {
    db.aggregate(pipeline).toArray((err, result) => {
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

Issue.prototype.update = function (id, callback) {
  issuesStore.connect(db => {
    const filter = {
      _id: issuesStore.ObjectID(id)
    }
    db.findOneAndUpdate(filter, { $set : this }, { returnOriginal: false }, (err, result) => {
      if (err) callback(err);
      else callback(null, result.value);
    });
  });
};

module.exports = Issue;
