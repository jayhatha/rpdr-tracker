"use strict";

module.exports = (sequelize, DataTypes) => {
  const pick = sequelize.define("pick", {
    teamId: DataTypes.INTEGER,
    weekId: DataTypes.INTEGER,
    queen: DataTypes.STRING,
    points: DataTypes.INTEGER
  }, {});
  pick.associate = function (models) {
    models.pick.belongsTo(models.team);
    models.pick.belongsTo(models.week);
  };
  return pick;
};
