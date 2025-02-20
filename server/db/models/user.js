'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Vacancy, VacancyStatus }) {
      this.belongsToMany(Vacancy, { through: VacancyStatus, foreignKey: 'vacancyId' });
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
