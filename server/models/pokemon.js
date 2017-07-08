'use strict';

module.exports = function (sequelize, DataTypes) {
  var Pokemon = sequelize.define('Pokemon', {
    id:               {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name:             DataTypes.STRING,
    type1:            DataTypes.STRING,
    type2:            DataTypes.STRING,
    total:            DataTypes.INTEGER,
    hp:               DataTypes.INTEGER,
    attack:           DataTypes.INTEGER,
    defense:          DataTypes.INTEGER,
    special_attack:   DataTypes.INTEGER,
    special_defense:  DataTypes.INTEGER,
    speed:            DataTypes.INTEGER,
    generation:       DataTypes.INTEGER,
    legendary:        DataTypes.BOOLEAN
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'pokemon'
  });

  return Pokemon;
};
