'use strict';
module.exports = (sequelize, DataTypes) => {
  var queensLists = sequelize.define('queensLists', {
    queenId: DataTypes.INTEGER,
    listId: DataTypes.INTEGER
  }, {});
  queensLists.associate = function(models) {
    // associations can be defined here
  };
  return queensLists;
};