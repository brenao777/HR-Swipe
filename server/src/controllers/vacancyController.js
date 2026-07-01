'use strict';

const vacancyService = require('../services/vacancyService');

const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await vacancyService.findVacancies(req.query);
    return res.status(200).json(vacancies);
  } catch (error) {
    console.error('Ошибка при загрузке вакансий: ', error);
    return res.status(500).send({ message: error.message });
  }
};

const createVacancy = async (req, res) => {
  try {
    const {
      companyId,
      title,
      description,
      location,
      experience,
      format,
      schedule,
      from,
      before,
      workDuration,
    } = req.body;

    if (
      !companyId ||
      !title ||
      !description ||
      !location ||
      !experience ||
      !format ||
      !schedule ||
      !from ||
      !before ||
      !workDuration
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
      from: Number(from),
      before: Number(before),
      workDuration,
    });
    return res.status(201).json(newVacancy);
  } catch (error) {
    console.error('Ошибка при добавлении вакансии: ', error);
    return res.status(500).send({ message: error.message });
  }
};

// Returns the resumes (candidates) that responded to a given vacancy.
const getVacancyById = async (req, res) => {
  try {
    const { vacancyId } = req.params;
    const candidates = await vacancyService.findVacancyById(vacancyId);
    return res.status(200).json(candidates);
  } catch (error) {
    console.error('Error in getVacancyById:', error);
    return res.status(500).json({ message: error.message || 'Ошибка сервера' });
  }
};

const deleteVacancy = async (req, res) => {
  try {
    const { vacancyId } = req.params;
    const result = await vacancyService.deleteVacancyById(vacancyId);
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }
    return res.status(200).json({ message: 'Вакансия успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении вакансии: ', error);
    return res.status(500).send({ message: error.message });
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
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllVacancies,
  createVacancy,
  getVacancyById,
  deleteVacancy,
  updateVacancy,
};
