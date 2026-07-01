const { Vacancy, Resume, ResumeStatus, User } = require('../../db/models');

// Every vacancy the user's resumes responded to, together with the response status.
async function getVacanciesWithResumeStatuses(userId) {
  const user = await User.findByPk(userId, {
    include: {
      model: Resume,
      include: {
        model: ResumeStatus,
        include: { model: Vacancy },
      },
    },
  });

  if (!user) return [];

  return user.Resumes.flatMap((resume) =>
    resume.ResumeStatuses.map((statusObj) => ({
      status: statusObj.status,
      Vacancy: statusObj.Vacancy,
    })),
  );
}

async function editResumeStatus(resumeId, status, vacancyId) {
  return ResumeStatus.update({ status }, { where: { resumeId, vacancyId } });
}

module.exports = { getVacanciesWithResumeStatuses, editResumeStatus };
