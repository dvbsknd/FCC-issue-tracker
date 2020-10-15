'use strict';

const Database = require('../utils/database');
const projectsStore = new Database('projects');

function Project (data) {
  const requiredFields = ['project_name'];
  const optionalFields = [];
  const validFields = requiredFields.concat(optionalFields);
  if (requiredFields.every(field => data[field])) {
    validFields.forEach(field => this[field] = data[field]);
  } else throw new Error('Invalid project data provided');
}

Project.find = function (projectName, callback) {
  projectsStore.connect(db => {
    db.findOne({ project_name: projectName }, {}, (err, result) => {
      if (err) callback(err);
      else if (!result) callback(new Error('Project not found'));
      else callback(null, result);
    });
  });
};

Project.prototype.findOrCreate = function (callback) {
  projectsStore.connect(db => {
    db.findOneAndUpdate(
      { project_name: this.project_name },
      { $setOnInsert: { project_name: this.project_name } },
      { upsert: true,
        returnOriginal: false,
        returnNewDocument: true
      },
      (err, result) => {
        if (err) callback(err);
        else callback(null, result.value);
      });
  });
};

module.exports = Project;
