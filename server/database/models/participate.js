'use strict';

/**
 * Modele Participate
 * @module Pparticipate
 * @requires sequelize
 * @desc Participate is a pivot table between user and training
 * @class Participate
 * @param {Int} `trainingId` INT(11) NOT NULL, FOREIGN KEY (`trainingId`) REFERENCES `trainings` (`id`)
 * @param {Int} `userId` INT(11) NOT NULL - INT(11) NOT NULL, FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
 * @param {Int} description - VARCHAR(255) NOT NULL
 * @return {Schema}
 */
module.exports = (sequelize, DataTypes) => {
  let Participate = sequelize.define('Participate', {
    trainingId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Training',
        key: 'id'
      }
    },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
    isSubscribe: DataTypes.INTEGER
  }, {});
  Participate.associate = function(models) {
    // associations can be defined here
    models.User.belongsToMany(models.Training, {
      through: models.Participate,
      foreignKey: 'userId',
      otherKey: 'trainingId',
    });

    models.Training.belongsToMany(models.User, {
      through: models.Participate,
      foreignKey: 'trainingId',
      otherKey: 'userId',
    });

    models.Participate.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    models.Participate.belongsTo(models.Training, {
      foreignKey: 'trainingId',
      as: 'training',
    });
  };
  return Participate;
};


//sequelize model:create --attributes "messageId:integer userId:integer" --name Like
