'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_training = sequelize.define('user_training', {
    user_id: DataTypes.INTEGER,
    training_id: DataTypes.INTEGER
  }, {});
  user_training.associate = function(models) {
    // associations can be defined here
  };
  return user_training;
};