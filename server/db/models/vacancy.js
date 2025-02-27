'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vacancy extends Model {
    static associate({ User, Company, VacancyStatus, ResumeStatus }) {
      this.belongsToMany(User, { through: VacancyStatus, foreignKey: 'vacancyId' });
      this.belongsTo(Company, { foreignKey: 'companyId' });
      this.hasMany(ResumeStatus, { foreignKey: 'vacancyId' });
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
      workDuration: DataTypes.ENUM(['1-3', '3-6', '6+']),
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
