'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_training = sequelize.define('user_training', {
    user_id: DataTypes.INTEGER,
    training_id: DataTypes.INTEGER
  }, {});
  user_training.associate = function(models) {

    models.Training.belongsToMany(models.Training, {
      through: models.user_training,
      foreignKey : 'trainingId',
      otherKey: 'userId'});

    models.User.belongsToMany(models.User, {
      through: models.user_training,
      foreignKey : 'trainingId',
      otherKey: 'userId'});

    models.User.belongsTo(models.User, {
      foreignKey : 'userId',
      as: 'user'});

    models.Training.belongsTo(models.Training, {
      foreignKey : 'trainingId',
      as: 'training'});
  };
  return user_training;
};
