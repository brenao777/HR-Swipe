'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Vacancy, VacancyStatus, Resume, Company }) {
      this.belongsToMany(Vacancy, { through: VacancyStatus, foreignKey: 'userId' });
      this.hasMany(Resume, { foreignKey: 'userId' });
      this.hasOne(Company, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      secondName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      company: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
