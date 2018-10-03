// const dotenv = require('dotenv').config({path: 'C:\\dev\\AngularBee\\angularBeeV2\\.env'});
// const dotenv = require('dotenv').config({path: 'C:\\laragon\\www\\AngularBee\\.env'});

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
      underscored: false
    },
  },
};


