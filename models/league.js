'use strict';
module.exports = (sequelize, DataTypes) => {
  var league = sequelize.define('league', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    season: DataTypes.INTEGER
  }, {});
  league.associate = function(models) {
    // associations can be defined here
    models.league.hasMany(models.team);
  };
  return league;
};
