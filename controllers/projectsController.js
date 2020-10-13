'use strict';

const Project = require('../models/projectsModel.js');

module.exports.getProject = (projectName, callback) => {
  if (!projectName) callback(null, null);
  else {
    const project = new Project({ project_name: projectName });
    try {
      project.findOrCreate((err, data) => {
        callback(null, data);
      });
    } catch(err) {
      callback(err.message);
    }
  }
}

