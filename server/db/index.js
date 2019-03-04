'use strict'; //no undeclared variables

const db = require('./database');
const Calculation = require('./models/calculation');

// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models (which you should define in separate modules in this directory).

// Model Associations

module.exports = {
  // Include your models in this exports object as well!
  db,
  Calculation,
};
