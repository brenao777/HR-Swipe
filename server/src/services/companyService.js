const { Company, Vacancy } = require('../../db/models');
const { Op } = require('sequelize');
const sharp = require('sharp');
const path = require('path');

// The (single) company that belongs to a user.
const findCompany = async (search, userId) => {
  const where = { userId };
  if (search && search.length !== 0) {
    where.title = { [Op.like]: `%${search}%` };
  }

  return Company.findOne({ where, order: [['id', 'DESC']] });
};

const createCompany = async ({ title, description, userId, file, location }) => {
  const fileName = `${userId}-${Date.now()}.webp`;
  const filePath = path.join(__dirname, `../../public/${fileName}`);
  await sharp(file.buffer).webp().toFile(filePath);

  return Company.create({
    title,
    description,
    userId,
    logo: fileName,
    location,
  });
};

// Company with its vacancies for the given owner.
const findCompanyIdById = async (userId) =>
  Company.findOne({
    where: { userId },
    include: { model: Vacancy },
  });

const deleteCompanyByUserId = async (ownerId, userId) => {
  if (Number(ownerId) !== Number(userId)) {
    return { success: false, status: 403, message: 'У вас нет прав на удаление этой компании!' };
  }

  const company = await Company.findOne({ where: { userId: ownerId } });
  if (!company) {
    return { success: false, status: 404, message: 'Компания не найдена!' };
  }

  await Vacancy.destroy({ where: { companyId: company.id } });
  await company.destroy();
  return { success: true, status: 200, message: 'Компания успешно удалена!' };
};

const updateCompanyByUserId = async (ownerId, userId, updates) => {
  if (Number(ownerId) !== Number(userId)) {
    return { success: false, status: 403, message: 'У вас нет прав на изменение этой компании!' };
  }

  const company = await Company.findOne({ where: { userId: ownerId } });
  if (!company) {
    return { success: false, status: 404, message: 'Компания не найдена!' };
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
  deleteCompanyByUserId,
  updateCompanyByUserId,
};
