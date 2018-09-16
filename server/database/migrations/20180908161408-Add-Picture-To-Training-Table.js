'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
       'Trainings',
        'picture',
        Sequelize.STRING,
    );
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('picture');
  }
};
