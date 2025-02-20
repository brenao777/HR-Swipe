'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate({ Vacancy }) {
      this.hasMany(Vacancy, { foreignKey: 'vacancyId' });
    }
  }
  Company.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      vacancyId: DataTypes.INTEGER,
      logo: DataTypes.STRING,
      location: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Company',
    },
  );
  return Company;
};
