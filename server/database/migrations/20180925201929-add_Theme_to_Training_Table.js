'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Trainings',
      'theme',
      Sequelize.STRING,
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Trainings',
      'theme',
    );
  }
};
