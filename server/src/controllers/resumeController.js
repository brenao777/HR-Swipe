const resumeService = require('../services/resumeService');

const getAllResumes = async (req, res) => {
  try {
    const { search } = req.query;
    const resumes = await resumeService.findResume(search);
    return res.status(200).json(resumes);
  } catch (error) {
    console.error('Ошибка при загрузке резюме: ', error);
    return res.sendStatus(500);
  }
};

const createResume = async (req, res) => {
  try {
    const { specialty, number, location, age, experience, coverLetter } = req.body;
    const { user } = res.locals;
    const { file } = req;

    const newResume = await resumeService.createResume({
      specialty,
      number,
      location,
      age: Number(age),
      experience,
      coverLetter,
      file,
      userId: user.id,
    });
    return res.status(201).json(newResume);
  } catch (error) {
    console.error('Ошибка при создании резюме: ', error);
    return res.status(500).send({ message: error.message });
  }
};

const getResumeById = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const resume = await resumeService.findResumeIdById(userId);
    if (!resume) {
      return res.status(404).json({ message: 'Резюме не найдено!' });
    }
    return res.status(200).json(resume);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = res.locals.user.id;

    const result = await resumeService.deleteResumeById(id, userId);
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }
    return res.status(200).json({ message: 'Резюме успешно удалено' });
  } catch (error) {
    console.error('Ошибка при удалении резюме: ', error);
    return res.sendStatus(500);
  }
};

module.exports = {
  getAllResumes,
  createResume,
  getResumeById,
  deleteResume,
};
