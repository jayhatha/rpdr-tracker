"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("picks", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    weekId: {
      type: Sequelize.INTEGER
    },
    teamId: {
      type: Sequelize.INTEGER
    },
    queen: {
      type: Sequelize.STRING
    },
    points: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable("picks")
};
