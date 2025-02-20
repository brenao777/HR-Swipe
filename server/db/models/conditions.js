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
      income: DataTypes.ENUM(['80000', '90000', '100000']),
      format: DataTypes.ENUM(['Удаленно', 'Офис', 'Гибрид']),
      schedule: DataTypes.ENUM(['Полная', 'Частичная', 'Проектная']),
    },
    {
      sequelize,
      modelName: 'Conditions',
    },
  );
  return Conditions;
};
