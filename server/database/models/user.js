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
    models.User.hasMany(models.Training);
  };
  return User;
};

//sequelize model:create --attributes "messageId:integer userId:integer" --name Like

//Titre de la certification
//Editeur de certification
//Domaine d'expertise

//Description
//Validité
// Coût
  // Coût HT/TTC
//Détail de l'examens
  //Durée de l'examen
  //Numéro d'examen (null)

//Comment s'inscrire
//Information utile
