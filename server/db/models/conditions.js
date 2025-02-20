'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conditions extends Model {
    static associate({ Vacancy }) {
      this.belongsTo(Vacancy, { foreignKey: 'conditionsId' });
    }
  }
  Conditions.init(
    {
      experience: DataTypes.STRING,
      income: DataTypes.ENUM,
      format: DataTypes.ENUM,
      schedule: DataTypes.ENUM,
    },
    {
      sequelize,
      modelName: 'Conditions',
    },
  );
  return Conditions;
};
