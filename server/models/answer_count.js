'use strict';

module.exports = function (sequelize, DataTypes) {
  var AnswerCount = sequelize.define('AnswerCount', {
    id:               {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    correct_count: DataTypes.INTEGER,
    incorrect_count: DataTypes.INTEGER,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'answer_count',
  });

  return AnswerCount;
};
