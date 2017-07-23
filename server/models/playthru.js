'use strict';

var Pokemon = require('./pokemon')

module.exports = function (sequelize, DataTypes) {
  var Playthru = sequelize.define('Playthru', {
    id:               {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_initials:       DataTypes.STRING,
    quiz_type:           DataTypes.STRING,
    quiz_set:            DataTypes.STRING,
    start_time:          DataTypes.BIGINT,
    end_time:            DataTypes.BIGINT,
    clue_count:          DataTypes.INTEGER,
    correct_answer_stack: DataTypes.ARRAY(DataTypes.INTEGER),
    wrong_answer:  DataTypes.INTEGER,
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'playthru',
    classMethods: {
      associate: function(models) {
        Playthru.hasOne(models.Pokemon, {as: wrong_answer});
      }
    }
  });

  return Playthru;
};
