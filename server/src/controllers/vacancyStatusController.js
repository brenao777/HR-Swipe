const vacancyStatusService = require('../services/vacancyStatusService');

const createResponse = async (req, res) => {
  try {
    const { user } = res.locals;
    const { vacancyId } = req.body;
    const newResponse = await vacancyStatusService.createConnection(user.id, vacancyId);
    res.status(201).json(newResponse);
  } catch (error) {
    console.error('Ошибка при создании отклика: ', error);
    res.status(500).send({ message: error.message });
  }
};
module.exports = { createResponse };
