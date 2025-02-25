'use strict';

const { Vacancy } = require('../../db/models');
const { Op } = require('sequelize');
// const sharp = require('sharp');
// const path = require('path');

const findVacancies = async (search) => {
  if (search && search.length !== 0) {
    return Vacancy.findAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
      },
    });
  }
  return Vacancy.findAll({
    order: [['id', 'DESC']],
  });
};

const createVacancy = async ({ title, description, location, userId }) =>
  // If you later add an 'img' field to Vacancy, uncomment and adjust the following:
  // const fileName = `${userId}-${new Date().getTime()}.webp`;
  // const filePath = path.join(__dirname, `../../public/${fileName}`);
  // await sharp(file.buffer).webp().toFile(filePath);

  Vacancy.create({
    title,
    description,
    location,
    userId, // Assuming Vacancy has a userId foreign key, adjust if not
  });
// const findVacancyById = async (vacancyId) =>
//   Vacancy.findOne({ where: { id: vacancyId } });

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
    // Assuming Vacancy has a userId field
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
  // findVacancyById,
  deleteVacancyById,
  updateVacancyById,
};
