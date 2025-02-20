const { Resume } = require('../../db/models');
const { Op } = require('sequelize');
// const sharp = require('sharp');
// const path = require('path');

const findResume = async (search) => {
  if (search && search.length !== 0) {
    return Resume.findAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
      },
    });
  }
  return Resume.findAll({
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
}) => {
  const newResume = Resume.create({
    number,
    specialty,
    location,
    age,
    experience,
    coverLetter,
    userId,
  });
  return newResume;
};

const findResumeIdById = async (resumeId) => Resume.findOne({ where: { id: resumeId } });

const deleteResumeById = async (resumeId, userId) => {
  const resume = await Resume.findByPk(resumeId);
  if (!resume) {
    return { success: false, status: 404, message: 'Товар не найден!' };
  }
  if (resume.userId !== userId) {
    return {
      success: false,
      status: 403,
      message: 'У вас нет прав на удаление этого резюме!',
    };
  }

  await Resume.destroy({
    where: {
      id: resumeId,
    },
  });

  return { success: true, status: 200, message: 'Резюме успешно удален!' };
};

const updateResumeById = async (resumeId, userId, updates) => {
  const resume = await Resume.findOne({ where: { id: resumeId } });
  //   const fileName = resume.img;
  //   const filePath = path.join(__dirname, `../../public/${fileName}`);
  //   await sharp(updates.file.buffer).webp().toFile(filePath);

  if (!resume) {
    return { success: false, status: 404, message: 'Резюме не найдено!' };
  }

  if (resume.userId !== userId) {
    return {
      success: false,
      status: 403,
      message: 'У вас нет прав на изменение этого товара!',
    };
  }

  await resume.update({
    number: updates.number || resume.number,
    specialty: updates.specialty || resume.specialty,
    location: updates.location || resume.location,
    age: updates.age || resume.age,
    experience: updates.experience || resume.experience,
    coverLetter: updates.coverLetter || resume.coverLetter,
    userId: updates.userId || resume.userId,
  });

  return { success: true, resume };
};

module.exports = {
  findResume,
  createResume,
  findResumeIdById,
  deleteResumeById,
  updateResumeById,
};
