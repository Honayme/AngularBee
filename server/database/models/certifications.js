'use strict';
module.exports = (sequelize, DataTypes) => {
  let Certifications = sequelize.define('Certifications', {
    title: DataTypes.STRING,
    editor: DataTypes.STRING,
    expertiseField: DataTypes.STRING,
    desc: DataTypes.TEXT,
    validity: DataTypes.TEXT,
    cost: DataTypes.TEXT,
    costHt: DataTypes.INTEGER,
    costTtc: DataTypes.INTEGER,
    examDetail: DataTypes.TEXT,
    examDuration: DataTypes.TIME,
    examNumber: DataTypes.INTEGER
  }, {});
  Certifications.associate = function(models) {
    // associations can be defined here
  };
  return Certifications;
};
