const { Resume, User } = require('../../db/models');
const { Op } = require('sequelize');
const sharp = require('sharp');
const path = require('path');

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
    include: {
      model: User,
      attributes: ['firstName', 'secondName'],
    },
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
  fullName,
}) => {
  const fileName = `${userId}-${new Date().getTime()}.webp`;
  const filePath = path.join(__dirname, `../../public/${fileName}`);
  await sharp(file.buffer).webp().toFile(filePath);

  const newResume = Resume.create({
    number,
    specialty,
    location,
    age,
    experience,
    coverLetter,
    userId,
    photo: fileName,
    fullName,
  });
  return newResume;
};

const findResumeIdById = async (userId) =>
  Resume.findAll({
    where: { userId },
    include: {
      model: User,
      attributes: ['firstName', 'secondName'],
    },
  });

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

// const updateResumeById = async (id, status) => {
//   const resume = await Resume.findOne({ where: { id } });

//   if (!resume) {
//     return { success: false, status: 404, message: 'Резюме не найдено!' };
//   }

//   await resume.update({
//     status,
//   });

//   return { success: true, resume };
// };

module.exports = {
  findResume,
  createResume,
  findResumeIdById,
  deleteResumeById,
  // updateResumeById,
};
