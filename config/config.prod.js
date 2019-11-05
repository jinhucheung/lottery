const database = require('../database/config.json');

module.exports = app => {
  const exports = {};

  exports.sequelize = database.production;

  return exports;
};
