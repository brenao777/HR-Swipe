const { verifyAccessToken } = require('../middlewares/verifyTokens');
const vacancyStatusRouter = require('express').Router();
const vacancyStatusController = require('../controllers/vacancyStatusController');

vacancyStatusRouter
  .route('/:id')
  .post(verifyAccessToken, vacancyStatusController.createResponse);

module.exports = vacancyStatusRouter;
