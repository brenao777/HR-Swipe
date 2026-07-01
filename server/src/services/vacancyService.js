'use strict';

const { Vacancy, Company, Resume, User, ResumeStatus } = require('../../db/models');
const { Op } = require('sequelize');

const findVacancies = async (filters = {}) => {
  const query = {};

  if (filters.title) query.title = { [Op.like]: `%${filters.title}%` };
  if (filters.format) query.format = filters.format;
  if (filters.workDuration) query.workDuration = filters.workDuration;
  if (filters.schedule) query.schedule = filters.schedule;
  if (filters.location) query.location = { [Op.like]: `%${filters.location}%` };
  if (filters.experience) query.experience = { [Op.like]: `%${filters.experience}%` };

  // Salary range filter
  if (filters.from || filters.before) {
    query[Op.and] = [];
    if (filters.from) query[Op.and].push({ from: { [Op.gte]: Number(filters.from) } });
    if (filters.before) query[Op.and].push({ before: { [Op.lte]: Number(filters.before) } });
  }

  return Vacancy.findAll({
    where: query,
    include: { model: Company, attributes: ['title', 'logo'] },
    order: [['id', 'DESC']],
  });
};

const createVacancy = async (data) => Vacancy.create(data);

// Resumes (candidates) that responded to a given vacancy.
const findVacancyById = async (vacancyId) => {
  const responses = await ResumeStatus.findAll({
    where: { vacancyId },
    include: {
      model: Resume,
      include: { model: User, attributes: ['firstName', 'secondName'] },
    },
  });

  return responses
    .filter((item) => item.Resume)
    .map((item) => ({
      id: item.Resume.id,
      userId: item.Resume.userId,
      number: item.Resume.number,
      specialty: item.Resume.specialty,
      location: item.Resume.location,
      age: item.Resume.age,
      experience: item.Resume.experience,
      coverLetter: item.Resume.coverLetter,
      photo: item.Resume.photo,
      User: {
        firstName: item.Resume.User.firstName,
        secondName: item.Resume.User.secondName,
      },
    }));
};

const deleteVacancyById = async (vacancyId) => {
  const vacancy = await Vacancy.findByPk(vacancyId);
  if (!vacancy) {
    return { success: false, status: 404, message: 'Вакансия не найдена!' };
  }

  await vacancy.destroy();
  return { success: true, status: 200, message: 'Вакансия успешно удалена!' };
};

const updateVacancyById = async (vacancyId, userId, updates) => {
  const vacancy = await Vacancy.findByPk(vacancyId, { include: { model: Company } });

  if (!vacancy) {
    return { success: false, status: 404, message: 'Вакансия не найдена!' };
  }

  if (vacancy.Company?.userId !== userId) {
    return {
      success: false,
      status: 403,
      message: 'У вас нет прав на изменение этой вакансии!',
    };
  }

  await vacancy.update({
    title: updates.title || vacancy.title,
    description: updates.description || vacancy.description,
    location: updates.location || vacancy.location,
  });

  return { success: true, vacancy };
};

module.exports = {
  findVacancies,
  createVacancy,
  findVacancyById,
  deleteVacancyById,
  updateVacancyById,
};
