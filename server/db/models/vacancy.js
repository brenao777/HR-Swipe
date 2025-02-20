'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vacancy extends Model {
    static associate({ User, Company, Conditions, VacancyStatus }) {
      this.belongsToMany(User, { through: VacancyStatus, foreignKey: 'vacancyId' });
      this.belongsTo(Company, { foreignKey: 'vacancyId' });
      this.belongsTo(Conditions, { foreignKey: 'conditionsId' });
    }
  }
  Vacancy.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      conditionsId: DataTypes.INTEGER,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Vacancy',
    },
  );
  return Vacancy;
};
