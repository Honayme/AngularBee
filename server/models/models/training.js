'use strict';
module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define('Training', {
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
    models.Training.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Training;
};
