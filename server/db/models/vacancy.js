'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vacancy extends Model {
    static associate({ User, Company, VacancyStatus }) {
      this.belongsToMany(User, { through: VacancyStatus, foreignKey: 'vacancyId' });
      this.belongsTo(Company, { foreignKey: 'companyId' });
    }
  }
  Vacancy.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      companyId: DataTypes.INTEGER,
      experience: DataTypes.TEXT,
      format: DataTypes.ENUM(['Удаленно', 'Гибрид', 'Офис']),
      schedule: DataTypes.ENUM(['Полная', 'Частичная', 'Проектная']),
      from: DataTypes.INTEGER,
      before: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Vacancy',
    },
  );
  return Vacancy;
};
