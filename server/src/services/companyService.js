const { Company } = require('../../db/models');
const { Op } = require('sequelize');
// const sharp = require('sharp');
// const path = require('path');

const findCompany = async (search) => {
  if (search && search.length !== 0) {
    return Company.findAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
      },
    });
  }
  return Company.findAll({
    order: [['id', 'DESC']],
  });
};

const createCompany = async ({
  title,
  description,
  userId,
  logo,
  location,
}) => {
  const newCompany = Company.create({
  title,
  description,
  userId,
  logo,
  location,
  });
  return newCompany;
};

const findCompanyIdById = async (companyId) => Company.findOne({ where: { id: companyId } });

const deleteCompanyById = async (companyId, userId) => {
  const company = await Company.findByPk(companyId);
  if (!company) {
    return { success: false, status: 404, message: 'Товар не найден!' };
  }
  if (company.userId !== userId) {
    return {
      success: false,
      status: 403,
      message: 'У вас нет прав на удаление этого резюме!',
    };
  }

  await Company.destroy({
    where: {
      id: companyId,
    },
  });

  return { success: true, status: 200, message: 'Резюме успешно удален!' };
};

const updateCompanyById = async (companyId, userId, updates) => {
  const company = await Company.findOne({ where: { id: companyId } });
  //   const fileName = resume.img;
  //   const filePath = path.join(__dirname, `../../public/${fileName}`);
  //   await sharp(updates.file.buffer).webp().toFile(filePath);

  if (!company) {
    return { success: false, status: 404, message: 'Резюме не найдено!' };
  }

  if (company.userId !== userId) {
    return {
      success: false,
      status: 403,
      message: 'У вас нет прав на изменение этого товара!',
    };
  }

  await company.update({
    title: updates.title || company.title,
    description: updates.description || company.description,
    logo: updates.logo || company.logo,
    location: updates.location || company.location,
    userId: updates.userId || company.userId,
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
