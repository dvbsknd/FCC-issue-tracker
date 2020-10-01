'use strict';

const Issue = require('../models/issuesModel.js');

module.exports.createIssue = (data, callback) => {
  const issue = new Issue();
  if (issue.requiredFields.every(field => data[field])) {
    issue.validFields.forEach(field => issue.data[field] = data[field]);
    issue.save((err, data) => {
      if (err) callback(err);
      else callback(null, data);
    });
  } else callback('Missing required fields');
}
