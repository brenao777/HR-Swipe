'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResumeStatus extends Model {
    static associate({ Vacancy, Resume }) {
      this.belongsTo(Vacancy, { foreignKey: 'vacancyId' });
      this.belongsTo(Resume, { foreignKey: 'resumeId' });
    }
  }
  ResumeStatus.init(
    {
      resumeId: DataTypes.INTEGER,
      vacancyId: DataTypes.INTEGER,
      status: DataTypes.ENUM(['pending', 'accepted', 'rejection']),
    },
    {
      sequelize,
      modelName: 'ResumeStatus',
    },
  );
  return ResumeStatus;
};
