'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate({ Vacancy, User }) {
      this.hasMany(Vacancy, { foreignKey: 'companyId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Company.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
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
