'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Resume.init(
    {
      userId: DataTypes.INTEGER,
      number: DataTypes.STRING,
      specialty: DataTypes.STRING,
      location: DataTypes.STRING,
      age: DataTypes.INTEGER,
      experience: DataTypes.TEXT,
      coverLetter: DataTypes.TEXT,
      photo: DataTypes.STRING,
      status: DataTypes.ENUM(['pending', 'accepted', 'rejection']),
    },
    {
      sequelize,
      modelName: 'Resume',
    },
  );
  return Resume;
};
