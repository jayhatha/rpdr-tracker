'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
        'teams',
        'leagueId',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'teams',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'lists',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'picks',
        'weekId',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'picks',
        'teamId',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'picks',
        'queenId',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'weeks',
        'pickId',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'queens',
        'pickId',
        {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      )
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
        queryInterface.removeColumn('teams', 'leagueId'),
        queryInterface.removeColumn('teams', 'userId'),
        queryInterface.removeColumn('picks', 'queenId'),
        queryInterface.removeColumn('picks', 'teamId'),
        queryInterface.removeColumn('picks', 'weekId'),
        queryInterface.removeColumn('lists', 'userId'),
        queryInterface.removeColumn('weeks', 'pickId'),
        queryInterface.removeColumn('queens', 'pickId')

      ];
    }
  };
