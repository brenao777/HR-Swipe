const companyService = require('../services/companyService');
const getAllCompany = async (req, res) => {
  try {
    const { search } = req.query;
    const company = await companyService.findItems(search);
    return res.status(200).json(company);
  } catch (error) {
    console.error('Ошибка при загрузке резюме: ', error);
    return res.sendStatus(500);
  }
};

const createCompany = async (req, res) => {
  try {
    const { title, description, logo, location} = req.body;
    const { user } = res.locals;
    // const { file } = req;

    if (!title || !description || !logo || !location) {
      return res.status(400).json({ message: 'Некорректные данные' });
    }

    const newCompany = await companyService.createCompany({
      title,
      description,
      logo,
      location,
      userId: user.id,
      // file,
    });
    return res.status(201).json(newCompany);
  } catch (error) {
    console.error('Ошибка при создании резюме: ', error);
    return res.status(500).send({ message: error });
  }
};

const getItemById = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await companyService.findCompanyIdById(companyId);
    if (!company) {
      res.status(404).json({ message: 'Резюме не найдено!' });
    }
    setTimeout(() => {
      res.status(200).json(company);
    }, 1500);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const userId = res.locals.user.id;

    const result = await companyService.deleteResumeById(companyId, userId);
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }
    return res.status(200).json({ message: 'Заметка успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении резюме: ', error);
    return res.sendStatus(500);
  }
};

const updateCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { title, description, logo, location} = req.body;
    const userId = res.locals.user.id;
    // const { file } = req;

    const updatedCompany = await companyService.updateItemById(companyId, userId, {
        title,
        description,
        logo,
        location,
    });

    if (!updatedCompany.success) {
      return res.status(updatedCompany.status).json({ message: updatedCompany.message });
    }
    return res.json(updatedCompany.item);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = { getAllCompany, createCompany, getItemById, deleteCompany, updateCompany };
