const { VacancyStatus } = require('../../db/models');

const createConnection = async (userId, vacancyId) =>
  VacancyStatus.create({
    userId,
    vacancyId,
  });

module.exports = { createConnection };
