const {
  VacancyStatus,
  ResumeStatus,
  Resume,
  User,
  sequelize,
} = require('../../db/models');

const createConnection = async (userId, vacancyId) =>
  // Начинаем транзакцию для атомарности операций
  sequelize.transaction(async (transaction) => {
    // Ищем резюме пользователя
    const userWithResume = await User.findByPk(userId, {
      include: {
        model: Resume,
        attributes: ['id'], // Запрашиваем только ID резюме
        required: true, // Гарантируем наличие резюме
      },
      transaction,
    });

    if (!userWithResume) {
      throw new Error('User not found');
    }

    if (!userWithResume.Resumes || userWithResume.Resumes.length === 0) {
      throw new Error('User has no resumes');
    }

    const resumeId = userWithResume.Resumes[0].id;

    // Создаем записи в обеих таблицах
    await ResumeStatus.create(
      {
        vacancyId,
        resumeId,
      },
      { transaction },
    );

    return VacancyStatus.create(
      {
        userId,
        vacancyId,
      },
      { transaction },
    );
  });
module.exports = { createConnection };
