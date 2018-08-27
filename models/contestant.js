'use strict';
module.exports = (sequelize, DataTypes) => {
  var contestant = sequelize.define('contestant', {
    season: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    points: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    lipsyncs: DataTypes.INTEGER
  }, {});
  contestant.associate = function(models) {
    // associations can be defined here
  };
  return contestant;
};