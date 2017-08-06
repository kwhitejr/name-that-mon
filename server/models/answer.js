'use strict';

module.exports = function (sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    id:               {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pokemon_id: DataTypes.INTEGER,
    playthru_id: DataTypes.INTEGER,
    was_correct: DataTypes.BOOLEAN,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'answer',
  });

  return Answer;
};
