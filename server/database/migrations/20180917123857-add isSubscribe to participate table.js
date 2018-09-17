'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Participates',
      'isSubscribe',
      Sequelize.STRING,
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('isSubscribe');
  }
};

//TODO Make a one time migration for participate table
