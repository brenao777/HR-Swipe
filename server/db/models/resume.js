'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    static associate({ User, ResumeStatus }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(ResumeStatus, { foreignKey: 'resumeId' });
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
    },
    {
      sequelize,
      modelName: 'Resume',
    },
  );
  return Resume;
};
