'use strict';

const { Vacancy, Resume, User, ResumeStatus } = require('../../db/models');
const { Op } = require('sequelize');
// const sharp = require('sharp');
// const path = require('path');

const findVacancies = async (filters) => {
  const query = {};

  if (filters.title) {
    query.title = { [Op.like]: `%${filters.title}%` };
  }
  if (filters.format) {
    query.format = filters.format;
  }
  if (filters.workDuration) {
    query.workDuration = filters.workDuration;
  }
  if (filters.schedule) {
    query.schedule = filters.schedule;
  }
  if (filters.location) {
    query.location = filters.location;
  }
  if (filters.experience) {
    query.experience = { [Op.gte]: filters.experience };
  }

  // Фильтрация по диапазону зарплаты
  if (filters.from || filters.before) {
    query[Op.and] = [];

    if (filters.from) {
      query[Op.and].push({ from: { [Op.gte]: filters.from } }); // Минимальная зарплата >= from
    }
    if (filters.before) {
      query[Op.and].push({ before: { [Op.lte]: filters.before } }); // Максимальная зарплата <= before
    }
  }

  return Vacancy.findAll({
    where: query,
    order: [['id', 'DESC']],
  });
};

const createVacancy = async ({
  title,
  description,
  location,
  companyId,
  experience,
  format,
  schedule,
  from,
  before,
  workDuration,
}) =>
  // If you later add an 'img' field to Vacancy, uncomment and adjust the following:
  // const fileName = `${userId}-${new Date().getTime()}.webp`;
  // const filePath = path.join(__dirname, `../../public/${fileName}`);
  // await sharp(file.buffer).webp().toFile(filePath);

  Vacancy.create({
    title,
    description,
    location,
    companyId,
    experience,
    format,
    schedule,
    from,
    before,
    workDuration,
  });

const findVacancyById = async (vacancyId) => {
  const resumes = await ResumeStatus.findAll({
    where: { vacancyId },
    include: {
      model: Resume,
      include: {
        model: User,
        attributes: ['firstName', 'secondName'],
      },
    },
  });

  const formattedData = resumes.map((item) => ({
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
  return formattedData;
};

const findVacanciesByCompanyId = async (vacancyId) => {
  const vacancies = await Vacancy.findAll({
    where: { companyId: vacancyId },
  });
  return vacancies;
};

const deleteVacancyById = async (vacancyId, userId) => {
  const vacancy = await Vacancy.findByPk(vacancyId);
  if (!vacancy) {
    return { success: false, status: 404, message: 'Вакансия не найдена!' };
  }
  if (vacancy.userId !== userId) {
    // Assuming Vacancy has a userId field
    return {
      success: false,
      status: 403,
      message: 'У вас нет прав на удаление этой вакансии!',
    };
  }

  await Vacancy.destroy({
    where: {
      id: vacancyId,
    },
  });

  return { success: true, status: 200, message: 'Вакансия успешно удалена!' };
};

const updateVacancyById = async (vacancyId, userId, updates) => {
  const vacancy = await Vacancy.findOne({ where: { id: vacancyId } });

  if (!vacancy) {
    return { success: false, status: 404, message: 'Вакансия не найдена!' };
  }

  if (vacancy.userId !== userId) {
    return {
      success: false,
      status: 403,
      message: 'У вас нет прав на изменение этой вакансии!',
    };
  }

  // If you later add an 'img' field, uncomment and adjust:
  // const fileName = vacancy.img || `${userId}-${new Date().getTime()}.webp`;
  // const filePath = path.join(__dirname, `../../public/${fileName}`);
  // await sharp(updates.file.buffer).webp().toFile(filePath);

  await vacancy.update({
    title: updates.title || vacancy.title,
    description: updates.description || vacancy.description,
    location: updates.location || vacancy.location,
    // img: fileName // Uncomment if img is added to the model
  });

  return { success: true, vacancy };
};

module.exports = {
  findVacancies,
  createVacancy,
  findVacancyById,
  deleteVacancyById,
  updateVacancyById,
  findVacanciesByCompanyId,
};
