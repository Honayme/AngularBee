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

//TODO Make a one time migration for training table
