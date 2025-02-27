const { Vacancy, Resume, ResumeStatus, User } = require('../../db/models');

async function getVacanciesWithResumeStatuses(userId) {
  // const vacancy = await Vacancy.findAll({
  //   include: {
  //     where: { userId },
  //     // model: Resume,
  //     // attributes: ['status'],
  //   },
  // });
  const user = await User.findByPk(userId, {
    include: {
      model: Resume,
      include: {
        model: ResumeStatus,
        include: {
          model: Vacancy,
        },
      },
    },
  });

  const result = user.Resumes.map((resume) =>
    resume.ResumeStatuses.map((statusObj) => ({
      status: statusObj.status,
      Vacancy: statusObj.Vacancy,
    })),
  ).flat();
  // const status = await ResumeStatus.findAll({
  //   include: {
  //     model: Vacancy,
  //   },
  //   where: { resumeId },
  // });
  return result;
}

async function editResumeStatus(resumeId, status, vacancyId) {
  const newStatus = await ResumeStatus.update( { status }, { where: { resumeId, vacancyId } });
  return newStatus;
}

module.exports = { getVacanciesWithResumeStatuses, editResumeStatus };
