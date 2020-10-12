'use strict';

const Project = require('../models/projectsModel.js');

module.exports.getProject = (project, callback) => {
  try {
    Project.findOrCreate(project, (err, data) => {
      callback(null, data);
    });
  } catch(err) {
    callback(err.message);
  }
}

