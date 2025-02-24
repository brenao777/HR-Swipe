const { Conditions, Vacancy } = require('../../db/models');

const findConditions = async (filters) => {
  if (filters && Object.keys(filters).length !== 0) {
    return Conditions.findAll({
      where: {
        ...filters,
      },
    });
  }
  return Conditions.findAll();
};

const createCondition = async ({
  experience,
  from,
  before,
  format,
  schedule,
}) => {
  const newCondition = await Conditions.create({
    experience,
    from,
    before,
    format,
    schedule,
  });
  return newCondition;
};

const findConditionById = async (conditionId) =>
  Conditions.findByPk(conditionId);

const updateConditionById = async (conditionId, updates) => {
  const condition = await Conditions.findByPk(conditionId);
  if (!condition) {
    return { success: false, status: 404, message: 'Условие не найдено!' };
  }
  await condition.update(updates);
  return { success: true, condition };
};

const deleteConditionById = async (conditionId) => {
  const condition = await Conditions.findByPk(conditionId);
  if (!condition) {
    return { success: false, status: 404, message: 'Условие не найдено!' };
  }
  await Conditions.destroy({ where: { id: conditionId } });
  return { success: true, status: 200, message: 'Условие успешно удалено!' };
};

const findVacanciesByConditions = async (filters) => {
  const conditions = await Conditions.findAll({
    where: filters,
    include: [
      {
        model: Vacancy,
        as: 'vacancies', 
        required: true, 
      },
    ],
  });

  const vacancies = conditions.flatMap((condition) => condition.vacancies);

  return vacancies;
};

module.exports = {
  findConditions,
  createCondition,
  findConditionById,
  updateConditionById,
  deleteConditionById,
  findVacanciesByConditions,
};