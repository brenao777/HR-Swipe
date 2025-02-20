'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VacancyStatus extends Model {
    static associate() {}
  }
  VacancyStatus.init(
    {
      userId: DataTypes.INTEGER,
      vacancyId: DataTypes.INTEGER,
      interested: DataTypes.BOOLEAN,
      unInterested: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'VacancyStatus',
    },
  );
  return VacancyStatus;
};
