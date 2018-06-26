'use strict';
module.exports = (sequelize, DataTypes) => {
  var list = sequelize.define('list', {
    name: DataTypes.STRING
  }, {});
  list.associate = function(models) {
    // associations can be defined here
    models.list.belongsToMany(models.queen, {through: "queensLists"});
    models.list.belongsTo(models.user);
  };
  return list;
};
