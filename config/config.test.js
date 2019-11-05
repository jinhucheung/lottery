
const database = require('../database/config.json');

module.exports = app => {
  const exports = {};

  exports.sequelize = database.test;

  return exports;
};
