// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var user_training = sequelize.define('user_training', {
//     user_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'User',
//         key: 'id'
//       }
//     },
//     training_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'Training',
//         key: 'id'
//       }
//     },
//   }, {});
//   user_training.associate = function(models) {
//
//     models.Training.belongsToMany(models.Training, {
//       through: models.user_training,
//       foreignKey : 'trainingId',
//       otherKey: 'userId',
//       as: 'trainings'
//     });
//
//     models.User.belongsToMany(models.User, {
//       through: models.user_training,
//       foreignKey : 'userId',
//       otherKey: 'trainingId',
//       as: 'users'
//     });
//
//     models.User.belongsTo(models.User, {
//       foreignKey : 'userId',
//       as: 'user'
//     });
//
//     models.Training.belongsTo(models.Training, {
//       foreignKey : 'trainingId',
//       as: 'training'
//     });
//   };
//   return user_training;
// };
