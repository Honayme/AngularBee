'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    profilePicture: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    level: DataTypes.STRING,
    accessToken: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.belongsTo(models.Role);
    models.User.belongsToMany(models.Training, {through: models.user_training});
  };
  return User;
};
