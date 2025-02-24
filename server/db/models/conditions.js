'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conditions extends Model {
    static associate({ Vacancy }) {
      this.hasMany(Vacancy, { foreignKey: 'conditionsId' });
    }
  }
  Conditions.init(
    {
      experience: DataTypes.STRING,
      from: DataTypes.INTEGER,
      before: DataTypes.INTEGER,
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
