const companyService = require('../services/companyService');

// Company of the current user (used to check whether HR already has a company).
const getAllCompany = async (req, res) => {
  try {
    const { search } = req.query;
    const { user } = res.locals;

    const company = await companyService.findCompany(search, user.id);
    return res.status(200).json(company);
  } catch (error) {
    console.error('Ошибка при загрузке компаний: ', error);
    return res.sendStatus(500);
  }
};

const createCompany = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const { user } = res.locals;
    const { file } = req;

    const newCompany = await companyService.createCompany({
      title,
      description,
      file,
      location,
      userId: user.id,
    });

    return res.status(201).json(newCompany);
  } catch (error) {
    console.error('Ошибка при создании компании: ', error);
    return res.status(500).send({ message: error.message });
  }
};

// Company (with its vacancies) that belongs to :userId.
const getCompanyById = async (req, res) => {
  try {
    const { userId } = req.params;
    const company = await companyService.findCompanyIdById(userId);

    if (!company) {
      return res.status(404).json({ message: 'Компания не найдена!' });
    }

    return res.status(200).json(company);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { userId } = req.params;
    const { user } = res.locals;

    const result = await companyService.deleteCompanyByUserId(userId, user.id);
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(200).json({ message: 'Компания успешно удалена!' });
  } catch (error) {
    console.error('Ошибка при удалении компании: ', error);
    return res.sendStatus(500);
  }
};

const updateCompany = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, logo, location } = req.body;
    const { user } = res.locals;

    const updatedCompany = await companyService.updateCompanyByUserId(userId, user.id, {
      title,
      description,
      logo,
      location,
    });

    if (!updatedCompany.success) {
      return res.status(updatedCompany.status).json({ message: updatedCompany.message });
    }

    return res.json(updatedCompany.company);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  getAllCompany,
  createCompany,
  getCompanyById,
  deleteCompany,
  updateCompany,
};
