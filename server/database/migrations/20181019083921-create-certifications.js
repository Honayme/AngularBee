'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('certifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      editor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      expertiseField: {
        allowNull: false,
        type: Sequelize.STRING
      },
      desc: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      validity: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      cost: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      costHt: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      costTtc: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      examDetail: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      examDuration: {
        allowNull: false,
        type: Sequelize.TIME
      },
      examNumber: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('certifications');
  }
};
