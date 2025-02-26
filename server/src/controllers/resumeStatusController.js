const resumeStatusService = require('../services/resumeStatusService');

const getResumeStatuses = async (req, res) => {
  try {
    const status = await resumeStatusService.getVacanciesWithResumeStatuses();
    if (!status) {
      res.status(404).json({ message: 'Статус не найден!' });
    }
    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getResumeStatuses,
};
