'use strict';
module.exports = (sequelize, DataTypes) => {
  var team = sequelize.define('team', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    role: DataTypes.STRING,
    leagueId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  team.associate = function(models) {
    // associations can be defined here
    models.team.belongsTo(models.league);
    models.team.belongsTo(models.user);
    models.team.hasMany(models.pick);
  };
  return team;
};
