'use strict';
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
