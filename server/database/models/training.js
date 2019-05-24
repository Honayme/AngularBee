'use strict';
/**
 * Modele Training
 * @module Training
 * @requires sequelize
 *
 * @class Training
 * @param {Int} `userId` INT(11) NOT NULL, FOREIGN KEY REFERENCES `users` (`id`) The creator
 * @param {String} name - VARCHAR(255) NOT NULL
 * @param {String} description - VARCHAR(255) NOT NULL
 * @param {Int} duration - INT(11) NOT NULL
 * @param {String} date - DATETIME NOT NULL
 * @param {Time} hour - TIME NOT NULL
 * @param {Text} place - VARCHAR(255) NOT NULL
 * @param {Int} totalSeat - INT(11) NOT NULL
 * @param {Int} availableSeat - INT(11) NOT NULL
 * @param {Text} picture - LONGTEXT NULL
 * @param {String} theme - VARCHAR(255) NULL DEFAULT NULL
 * @return {Schema}
 */
module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define('Training', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    date: DataTypes.DATE,
    hour: DataTypes.TIME,
    place: DataTypes.STRING,
    totalSeat: DataTypes.INTEGER,
    availableSeat: DataTypes.INTEGER,
    picture: DataTypes.TEXT('long'),
    theme: DataTypes.STRING,
  }, {});
  Training.associate = function(models) {
    // associations can be defined here
    Training.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Training;
};
