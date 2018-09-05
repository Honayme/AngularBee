'use strict';

let localConfig = {
  hostname: process.env.DB_HOST,
  port: process.env.PORT,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

module.exports = localConfig;
