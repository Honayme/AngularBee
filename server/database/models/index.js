'use strict';

const fs        = require('fs'),
      path      = require('path'),
      Sequelize = require('sequelize'),
      basename  = path.basename(__filename),
      env       = process.env.NODE_ENV || 'development',
      config    = require(path.join(__dirname, '..', 'config', 'config.js'))[env],
      db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


//sequelize model:create --attributes "firstname:string lastname:string email:string password:string birthdate:date profilePicture:string country:string city:string level:string accessToken:string" --name User
//sequelize model:create --attributes "name:string" --name Role
//sequelize model:create --attributes "name:string description:string duration:integer date:date hour:time place:string availableSeat:integer" --name Training

