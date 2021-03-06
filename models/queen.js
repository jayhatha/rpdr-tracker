"use strict";

module.exports = (sequelize, DataTypes) => {
  const queen = sequelize.define("queen", {
    name: DataTypes.STRING
  }, {});
  queen.associate = function (models) {
    // associations can be defined here
    models.queen.belongsToMany(models.list, { through: "queensLists" });
  };
  return queen;
};
