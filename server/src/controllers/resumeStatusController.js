const resumeStatusService = require('../services/resumeStatusService');

const getResumeStatuses = async (req, res) => {
  try {
    const { user } = res.locals;
    const status = await resumeStatusService.getVacanciesWithResumeStatuses(user.id);
    if (!status) {
      res.status(404).json({ message: 'Статус не найден!' });
    }
    res.status(200).json(status);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const editResumeStatus = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const { status, vacancyId } = req.body;
    const updateStatus = await resumeStatusService.editResumeStatus(resumeId, status, vacancyId);

    res.status(200).json(updateStatus);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getResumeStatuses,
  editResumeStatus,
};
