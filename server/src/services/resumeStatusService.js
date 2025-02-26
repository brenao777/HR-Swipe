const { Resume, Vacancy } = require('../../db/models');

async function getVacanciesWithResumeStatuses() {
  const status = await Vacancy.findAll({
    include: [
      {
        model: Resume,
        attributes: ['status'],
      },
    ],
  });

  return status;
}

module.exports = { getVacanciesWithResumeStatuses };
