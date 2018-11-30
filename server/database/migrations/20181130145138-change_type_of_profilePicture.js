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
    //TODO Find how to change column type on rollback migrations
  }
};
