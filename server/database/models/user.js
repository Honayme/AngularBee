'use strict';
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
