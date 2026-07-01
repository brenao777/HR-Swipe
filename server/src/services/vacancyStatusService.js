const { VacancyStatus, ResumeStatus, Resume, User, sequelize } = require('../../db/models');

// An applicant "applies" to a vacancy: record the response (ResumeStatus)
// and the user↔vacancy link (VacancyStatus) atomically.
const createConnection = async (userId, vacancyId) =>
  sequelize.transaction(async (transaction) => {
    const userWithResume = await User.findByPk(userId, {
      include: { model: Resume, attributes: ['id'], required: true },
      transaction,
    });

    if (!userWithResume || userWithResume.Resumes.length === 0) {
      throw new Error('У пользователя нет резюме');
    }

    const resumeId = userWithResume.Resumes[0].id;

    await ResumeStatus.create({ vacancyId, resumeId, status: 'pending' }, { transaction });

    return VacancyStatus.create({ userId, vacancyId }, { transaction });
  });

module.exports = { createConnection };
