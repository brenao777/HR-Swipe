'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResumeStatus extends Model {
    static associate() {}
  }
  ResumeStatus.init(
    {
      resumeId: DataTypes.INTEGER,
      vacancyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ResumeStatus',
    },
  );
  return ResumeStatus;
};
