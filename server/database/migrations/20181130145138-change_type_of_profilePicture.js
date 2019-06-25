'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'users',
      'profilePicture', {
        type: Sequelize.TEXT('long')
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users', ['profilePicture'], {
      type: Sequelize.STRING,
    })
  }
};
