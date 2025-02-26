'use strict';

const vacancyService = require('../services/vacancyService');

const getAllVacancies = async (req, res) => {
  try {
    const filters = req.query; // Получаем все параметры из запроса
    const vacancies = await vacancyService.findVacancies(filters); // Передаем их в сервис
    return res.status(200).json(vacancies);
  } catch (error) {
    console.error('Ошибка при загрузке вакансий: ', error);
    return res.status(500).send({ message: error.message });
  }
};

const createVacancy = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      companyId,
      experience,
      format,
      schedule,
      from,
      before,
    } = req.body;
    // const { user } = res.locals;

    if (
      !title ||
      !description ||
      !location ||
      !companyId ||
      !experience ||
      !format ||
      !schedule ||
      !from ||
      !before
    ) {
      return res.status(400).json({ message: 'Необходимо указать все данные!' });
    }

    const newVacancy = await vacancyService.createVacancy({
      title,
      description,
      location,
      companyId,
      experience,
      format,
      schedule,
      from,
      before,
    });
    return res.status(201).json(newVacancy);
  } catch (error) {
    console.error('Ошибка при добавлении вакансии: ', error);
    return res.status(500).send('Error in createVacancy: ', { message: error.message });
  }
};

// const getVacancyById = async (req, res) => {
//   try {
//     const { vacancyId } = req.params; // vacancyId — строка из URL
//     const vacancy = await vacancyService.findVacancyById(vacancyId); // Передаём vacancyId
//     if (!vacancy) {
//       res.status(404).json({ message: 'Вакансия не найдена!' });
//     }
//     setTimeout(() => {
//       res.status(200).json(vacancy);
//     }, 1500);
//   } catch (error) {
//     console.error('Error in getVacancyById:', error);
//     res.status(500).json({ message: error.message || 'Ошибка сервера' }); // Исправлен формат ответа
//   }
// };

const deleteVacancy = async (req, res) => {
  try {
    const { vacancyId } = req.params;
    const userId = res.locals.user.id;

    const result = await vacancyService.deleteVacancyById(vacancyId, userId);
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }
    return res.status(200).json({ message: 'Вакансия успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении вакансии: ', error);
    return res.sendStatus(500);
  }
};

const updateVacancy = async (req, res) => {
  try {
    const { vacancyId } = req.params;
    const { title, description, location } = req.body;
    const userId = res.locals.user.id;

    const updatedVacancy = await vacancyService.updateVacancyById(vacancyId, userId, {
      title,
      description,
      location,
    });

    if (!updatedVacancy.success) {
      return res.status(updatedVacancy.status).json({ message: updatedVacancy.message });
    }
    return res.json(updatedVacancy.vacancy);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  getAllVacancies,
  createVacancy,
  // getVacancyById,
  deleteVacancy,
  updateVacancy,
};
