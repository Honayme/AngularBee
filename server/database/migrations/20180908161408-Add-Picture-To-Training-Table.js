'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
       'Trainings',
        'picture',
        Sequelize.TEXT('long'),
    );
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('picture');
  }
};

//TODO Make a one time migration for training table
