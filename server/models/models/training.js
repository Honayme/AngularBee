'use strict';
module.exports = (sequelize, DataTypes) => {
  var Training = sequelize.define('Training', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    date: DataTypes.DATE,
    hour: DataTypes.TIME,
    place: DataTypes.STRING,
    availableSeat: DataTypes.INTEGER
  }, {});
  Training.associate = function(models) {
    // associations can be defined here
    models.Training.belongsToMany(models.User, {through: models.user_training});
  };
  return Training;
};
