'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(
      'Users',
      'university',
      Sequelize.STRING,
    ),
    queryInterface.addColumn(
      'Users',
      'speciality',
      Sequelize.STRING,
    ),
    queryInterface.addColumn(
      'Users',
      'levelDegree',
      Sequelize.STRING,
    ),
    ]
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'university').then(function () {
      return queryInterface.removeColumn('Users', 'speciality').then(function(){
        return queryInterface.removeColumn('Users', 'levelDegree');
      });
    });

  },
};
