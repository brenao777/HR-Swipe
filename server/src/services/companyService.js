const { Company, Vacancy } = require('../../db/models');
const { Op } = require('sequelize');

// Поиск компаний с фильтрацией по userId
const findCompany = async (search, userId) => {
  const query = {};
  if (search && search.length !== 0) {
    query.title = { [Op.like]: `%${search}%` };
  }

  query.userId = userId; // Фильтруем по userId

  return Company.findOne({
    where: query,
    order: [['id', 'DESC']],
  });
};

// Создание новой компании
const createCompany = async ({ title, description, userId, logo, location }) => {
  const newCompany = await Company.create({
    title,
    description,
    userId,
    logo,
    location,
  });
  return newCompany;
};

const findCompanyIdById = async (userId) => {
  const company = await Company.findOne({
    where: { userId },
    include: { model: Vacancy, required: false },
  });
  if (company) {
    company.vacancies = company.vacancies || []; // Гарантируем массив
  }
  return company;
};

// Удаление компании с проверкой userId
const deleteCompanyById = async (companyId, userId) => {
  const company = await Company.findByPk(companyId);

  if (!company) {
    return { success: false, status: 404, message: 'Компания не найдена!' };
  }

  if (company.userId !== userId) {
    return {
      success: false,
      status: 403,
      message: 'У вас нет прав на удаление этой компании!',
    };
  }

  await Company.destroy({ where: { id: companyId } });
  return { success: true, status: 200, message: 'Компания успешно удалена!' };
};

// Обновление компании с проверкой userId
const updateCompanyById = async (companyId, userId, updates) => {
  const company = await Company.findOne({ where: { id: companyId } });

  if (!company) {
    return { success: false, status: 404, message: 'Компания не найдена!' };
  }

  if (company.userId !== userId) {
    return {
      success: false,
      status: 403,
      message: 'У вас нет прав на изменение этой компании!',
    };
  }

  await company.update({
    title: updates.title || company.title,
    description: updates.description || company.description,
    logo: updates.logo || company.logo,
    location: updates.location || company.location,
  });

  return { success: true, company };
};

module.exports = {
  findCompany,
  createCompany,
  findCompanyIdById,
  deleteCompanyById,
  updateCompanyById,
};
