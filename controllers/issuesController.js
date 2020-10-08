'use strict';

const Issue = require('../models/issuesModel.js');

module.exports.createIssue = (data, callback) => {
  try {
    const issue = new Issue(data);
    issue.save((err, data) => {
      callback(null, data);
    });
  } catch(err) {
    callback(err.message);
  }
}

module.exports.updateIssue = (data, callback) => {
  try {
    Issue.find(data.issue_id, (err, issue) => {
      Issue.update(issue._id, data, (err, updatedIssue) => {
        callback(null, updatedIssue);
      });
    });
  } catch(err) {
    callback(err.message);
  }
}

module.exports.listIssues = (callback) => {
  try {
    Issue.list((err, data) => {
      callback(null, data);
    });
  } catch(err) {
    callback(err.message);
  }
}
