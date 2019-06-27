'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'certifications',
        'howToSubscribe', {
          type: Sequelize.TEXT()
        }
      ),
      queryInterface.addColumn(
        'certifications',
        'usefulInfos', {
          type: Sequelize.TEXT()
        }
      ),
      queryInterface.changeColumn(
        'certifications',
        'examDuration', {
          type: Sequelize.STRING
        }
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
      'certifications',
      'cost',
      Sequelize.STRING,
    ),
    queryInterface.removeColumn('howToSubscribe'),
    queryInterface.removeColumn('usefulInfos'),
      queryInterface.changeColumn(
        'certifications',
        'examDuration', {
          type: Sequelize.TIME,
        }
      ),
    ])
  }
};
