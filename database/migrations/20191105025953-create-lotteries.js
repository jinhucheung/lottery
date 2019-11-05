'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    return queryInterface.createTable('lotteries', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(255),
      count: INTEGER,
      prizes: TEXT,
      finished_at: DATE,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lotteries');
  }
};
