'use strict';

const Issue = require('../models/issuesModel.js');
const Project = require('../controllers/projectsController.js');

module.exports.createIssue = (projectName, issueData, callback) => {
  Project.getOrCreateProject(projectName, (err, project) => {
    issueData.project_id = project.value._id;
    try {
      const issue = new Issue(issueData);
      issue.save((err, doc) => {
        callback(null, doc);
      });
    } catch(err) {
      callback(err.message);
    }
  });
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

module.exports.listIssues = (projectName, callback) => {
  Project.getProject(projectName, (err, project) => {
    if (err) callback(err.message);
    else {
      Issue.list(project, (err, data) => {
        if (err) callback(err.message);
        else callback(null, data);
      });
    }
  });
}
