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
    },
    {
      sequelize,
      modelName: 'VacancyStatus',
    },
  );
  return VacancyStatus;
};
