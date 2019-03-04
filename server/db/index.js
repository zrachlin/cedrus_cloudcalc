'use strict'; //no undeclared variables

const db = require('./database');
const Student = require('./models/student');
const Campus = require('./models/campus');

// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models (which you should define in separate modules in this directory).

// Model Associations
Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = {
  // Include your models in this exports object as well!
  db,
  Student,
  Campus,
};
