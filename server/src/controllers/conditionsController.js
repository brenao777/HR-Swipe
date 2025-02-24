const conditionsService = require('../services/conditionsService');

const getAllConditions = async (req, res) => {
  try {
    const filters = req.query; 
    const conditions = await conditionsService.findConditions(filters);
    return res.status(200).json(conditions);
  } catch (error) {
    console.error('Ошибка при загрузке условий: ', error);
    return res.sendStatus(500);
  }
};

const createCondition = async (req, res) => {
  try {
    const { experience, from, before, format, schedule } = req.body;
    const newCondition = await conditionsService.createCondition({
      experience,
      from,
      before,
      format,
      schedule,
    });
    return res.status(201).json(newCondition);
  } catch (error) {
    console.error('Ошибка при создании условия: ', error);
    return res.status(500).send({ message: error.message });
  }
};

const getConditionById = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = await conditionsService.findConditionById(id);
    if (!condition) {
      return res.status(404).json({ message: 'Условие не найдено!' });
    }
    return res.status(200).json(condition);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const updateCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const { experience, from, before, format, schedule } = req.body;
    const result = await conditionsService.updateConditionById(id, {
      experience,
      from,
      before,
      format,
      schedule,
    });
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }
    return res.json(result.condition);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const deleteCondition = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await conditionsService.deleteConditionById(id);
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }
    return res.status(200).json({ message: 'Условие успешно удалено!' });
  } catch (error) {
    console.error('Ошибка при удалении условия: ', error);
    return res.sendStatus(500);
  }
};

const filterVacanciesByConditions = async (req, res) => {
  try {
    const filters = req.query; 
    const vacancies = await conditionsService.findVacanciesByConditions(filters);
    return res.status(200).json(vacancies);
  } catch (error) {
    console.error('Ошибка при фильтрации вакансий: ', error);
    return res.sendStatus(500);
  }
};

module.exports = {
  getAllConditions,
  createCondition,
  getConditionById,
  updateCondition,
  deleteCondition,
  filterVacanciesByConditions,
};