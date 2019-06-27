'use strict';

/**
 * Modele Certification
 * @module Certification
 * @requires sequelize
 *
 * @class Certification
 * @param {String} title - VARCHAR(255) NOT NULL
 * @param {String} editor - VARCHAR(255) NOT NULL
 * @param {String} expertiseField - VARCHAR(255) NOT NULL
 * @param {Text} desc - TEXT NOT NULL
 * @param {Text} validity - TEXT NOT NULL
 * @param {Text} cost - TEXT NOT NULL
 * @param {Int} costHT - INT(11) NULL DEFAULT NULL
 * @param {Int} cosTtt - INT(11) NOT NULL
 * @param {Text} examDetail - TEXT NOT NULL
 * @param {Text} examDuration - VARCHAR(255) NOT NULL
 * @param {String} examNumber - VARCHAR(255) NULL DEFAULT NULL, May contain Char
 * @param {Text} howToSubscribe - TEXT NOT NULL
 * @param {Text} usefulInfos - TEXT NOT NULL
 * @return {Schema}
 */

module.exports = (sequelize, DataTypes) => {
  let Certifications = sequelize.define('Certifications', {
    title: DataTypes.STRING,
    editor: DataTypes.STRING,
    expertiseField: DataTypes.STRING,
    desc: DataTypes.TEXT,
    validity: DataTypes.TEXT,
    costHt: DataTypes.INTEGER,
    costTtc: DataTypes.INTEGER,
    examDetail: DataTypes.TEXT,
    examDuration: DataTypes.STRING,
    examNumber: DataTypes.INTEGER,
    howToSubscribe: DataTypes.TEXT,
    usefulInfos: DataTypes.TEXT,
  }, {});
  Certifications.associate = function(models) {
    // associations can be defined here
  };
  return Certifications;
};
