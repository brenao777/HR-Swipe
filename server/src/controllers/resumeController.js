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

    // if (!specialty || !number || !age || !experience) {
    //   return res.status(400).json({ message: 'Некорректные данные' });
    // }

    const newResume = await resumeService.createResume({
      specialty,
      number: Number(number),
      location,
      age: Number(age),
      experience,
      coverLetter,
      file,
      userId: user.id,
      fullName: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
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
      res.status(404).json({ message: 'Резюме не найдено!' });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = res.locals.user.id;

    const result = await resumeService.deleteResumeById(resumeId, userId);
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }
    return res.status(200).json({ message: 'Заметка успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении резюме: ', error);
    return res.sendStatus(500);
  }
};

const updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { number, specialty, location, experience, coverLetter } = req.body;
    const userId = res.locals.user.id;
    const { file } = req;

    const updatedResume = await resumeService.updateItemById(resumeId, userId, {
      number,
      specialty,
      location,
      experience,
      coverLetter,
      file,
    });

    if (!updatedResume.success) {
      return res.status(updatedResume.status).json({ message: updatedResume.message });
    }
    return res.json(updatedResume.item);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  getAllResumes,
  createResume,
  getResumeById,
  deleteResume,
  updateResume,
};
