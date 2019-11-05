'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Lottery = app.model.define('lottery', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    count: INTEGER,
    prizes: TEXT,
    created_at: DATE,
    updated_at: DATE
  }, {});

  Lottery.associate = function(models) {
    // associations can be defined here
  };

  return Lottery;
};