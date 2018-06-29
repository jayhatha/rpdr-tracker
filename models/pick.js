'use strict';
module.exports = (sequelize, DataTypes) => {
  var pick = sequelize.define('pick', {
    x: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
    weekId: DataTypes.INTEGER,
    queenId: DataTypes.INTEGER
  }, {});
  pick.associate = function(models) {
models.pick.belongsTo(models.team);
models.pick.belongsTo(models.week);
models.pick.hasMany(models.queen);
  };
  return pick;
};
