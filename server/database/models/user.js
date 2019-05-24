'use strict';
/**
 * Modele User
 * @module User
 * @requires sequelize
 *
 * @class User
 * @param {String} firstname - VARCHAR(255) NOT NULL
 * @param {String} lastname - VARCHAR(255) NOT NULL
 * @param {String} email - VARCHAR(255) NOT NULL
 * @param {String} password - VARCHAR(255) NOT NULL
 * @param {Date} birthdate - DATETIME NULL DEFAULT NULL
 * @param {Text} profilePicture - LONGTEXT NULL
 * @param {String} country - VARCHAR(255) NULL DEFAULT NULL
 * @param {String} city - VARCHAR(255) NULL DEFAULT NULL
 * @param {String} level - VARCHAR(255) NULL DEFAULT NULL
 * @param {String} accessToken - VARCHAR(255) NULL DEFAULT NULL
 * @param {String} university - VARCHAR(255) NULL DEFAULT NULL
 * @param {String} speciality - VARCHAR(255) NULL DEFAULT NULL
 * @param {String} levelDegree - VARCHAR(255) NULL DEFAULT NULL
 * @return {Schema}
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    profilePicture: DataTypes.TEXT('long'),
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    level: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    university: DataTypes.STRING,
    speciality: DataTypes.STRING,
    levelDegree: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Training);
  };
  return User;
};

//sequelize model:create --attributes "messageId:integer userId:integer" --name Like
