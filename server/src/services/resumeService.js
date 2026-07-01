const { Resume, User } = require('../../db/models');
const { Op } = require('sequelize');
const sharp = require('sharp');
const path = require('path');

const findResume = async (search) => {
  if (search && search.length !== 0) {
    return Resume.findAll({
      where: { specialty: { [Op.like]: `%${search}%` } },
      include: { model: User, attributes: ['firstName', 'secondName'] },
      order: [['id', 'DESC']],
    });
  }
  return Resume.findAll({
    include: { model: User, attributes: ['firstName', 'secondName'] },
    order: [['id', 'DESC']],
  });
};

const createResume = async ({
  number,
  specialty,
  location,
  age,
  experience,
  coverLetter,
  userId,
  file,
}) => {
  const fileName = `${userId}-${Date.now()}.webp`;
  const filePath = path.join(__dirname, `../../public/${fileName}`);
  await sharp(file.buffer).webp().toFile(filePath);

  return Resume.create({
    number,
    specialty,
    location,
    age,
    experience,
    coverLetter,
    userId,
    photo: fileName,
  });
};

const findResumeIdById = async (userId) =>
  Resume.findAll({
    where: { userId },
    include: { model: User, attributes: ['firstName', 'secondName'] },
  });

const deleteResumeById = async (resumeId, userId) => {
  const resume = await Resume.findByPk(resumeId);
  if (!resume) {
    return { success: false, status: 404, message: 'Резюме не найдено!' };
  }
  if (resume.userId !== userId) {
    return {
      success: false,
      status: 403,
      message: 'У вас нет прав на удаление этого резюме!',
    };
  }

  await resume.destroy();
  return { success: true, status: 200, message: 'Резюме успешно удалено!' };
};

module.exports = {
  findResume,
  createResume,
  findResumeIdById,
  deleteResumeById,
};
