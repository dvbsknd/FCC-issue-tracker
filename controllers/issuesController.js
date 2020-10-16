'use strict';

const Issue = require('../models/issuesModel.js');
const Project = require('../controllers/projectsController.js');

module.exports.createIssue = (projectName, issueData, callback) => {
  Project.getOrCreateProject(projectName, (err, project) => {
    issueData.project_id = project._id;
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

module.exports.updateIssue = (issueData, callback) => {
  Project.getProject(issueData.project, (err, project) => {
    try {
      issueData.project_id = project._id;
      const id = issueData._id;
      const issue = new Issue(issueData);
      issue.update(id, (err, doc) => {
        callback(null, doc);
      });
    } catch(err) {
      callback(err.message);
    }
  });
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

module.exports.deleteIssue = (id, callback) => {
  if (!id) callback(new Error('Issue ID required'));
  Issue.delete(id, (err, message) => {
    if (err) callback(err.message);
    else callback(null, message);
});
}
