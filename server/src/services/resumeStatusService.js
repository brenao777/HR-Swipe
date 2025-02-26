const { Resume, Vacancy } = require('../../db/models');

async function getVacanciesWithResumeStatuses(userId) {
  const status = await Vacancy.findAll({
    include: {
      where: { userId },
      model: Resume,
      attributes: ['status'],
    },
  });

  return status;
}

module.exports = { getVacanciesWithResumeStatuses };
