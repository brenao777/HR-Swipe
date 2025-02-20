'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vacancyStatus extends Model {
    static associate() {}
  }
  vacancyStatus.init(
    {
      userId: DataTypes.INTEGER,
      vacancyId: DataTypes.INTEGER,
      interested: DataTypes.BOOLEAN,
      unInterested: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'vacancyStatus',
    },
  );
  return vacancyStatus;
};
