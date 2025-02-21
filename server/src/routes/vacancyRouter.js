const { verifyAccessToken } = require('../middlewares/verifyTokens');
const vacancyRouter = require('express').Router();
const vacancyController = require('../controllers/vacancyController');

vacancyRouter
  .route('/')
  .get(verifyAccessToken, vacancyController.getAllVacancies)
  .post(verifyAccessToken, vacancyController.createVacancy);

vacancyRouter
  .route('/:vacancyId')
  .get(vacancyController.getAllVacancies)
  // .get(vacancyController.getVacancyById)
  .delete(verifyAccessToken, vacancyController.deleteVacancy)
  .put(verifyAccessToken, vacancyController.updateVacancy);

module.exports = vacancyRouter;
