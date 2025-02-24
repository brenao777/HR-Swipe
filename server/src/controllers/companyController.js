const companyService = require('../services/companyService');

// Получение всех компаний текущего пользователя
const getAllCompany = async (req, res) => {
  try {
    const { search } = req.query;
    const { user } = res.locals;

    if (!user) {
      return res.status(403).json({ message: 'Требуется авторизация' });
    }

    const companies = await companyService.findCompany(search, user.id);
    return res.status(200).json(companies);
  } catch (error) {
    console.error('Ошибка при загрузке компаний: ', error);
    return res.sendStatus(500);
  }
};

// Создание новой компании
const createCompany = async (req, res) => {
  try {
    const { title, description, logo, location } = req.body;
    const { user } = res.locals;

    if (!title || !description || !logo || !location) {
      return res.status(400).json({ message: 'Некорректные данные' });
    }

    const newCompany = await companyService.createCompany({
      title,
      description,
      userId: user.id,
      logo,
      location,
    });

    return res.status(201).json(newCompany);
  } catch (error) {
    console.error('Ошибка при создании компании: ', error);
    return res.status(500).send({ message: error });
  }
};

// Получение компании по ID
const getCompanyById = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { user } = res.locals;

    if (!user) {
      return res.status(403).json({ message: 'Требуется авторизация' });
    }

    const company = await companyService.findCompanyIdById(companyId, user.id);

    if (!company) {
      return res.status(404).json({ message: 'Компания не найдена!' });
    }

    return res.status(200).json(company);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

// Удаление компании
const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { user } = res.locals;

    if (!user) {
      return res.status(403).json({ message: 'Требуется авторизация' });
    }

    const result = await companyService.deleteCompanyById(companyId, user.id);

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(200).json({ message: 'Компания успешно удалена!' });
  } catch (error) {
    console.error('Ошибка при удалении компании: ', error);
    return res.sendStatus(500);
  }
};

// Обновление компании
const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { title, description, logo, location } = req.body;
    const { user } = res.locals;

    if (!user) {
      return res.status(403).json({ message: 'Требуется авторизация' });
    }

    const updatedCompany = await companyService.updateCompanyById(
      companyId,
      user.id,
      { title, description, logo, location }
    );

    if (!updatedCompany.success) {
      return res.status(updatedCompany.status).json({ message: updatedCompany.message });
    }

    return res.json(updatedCompany.company);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = { getAllCompany, createCompany, getCompanyById, deleteCompany, updateCompany };