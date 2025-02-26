const resumeStatusRouter = require('express').Router();
const resumeStatusController = require('../controllers/resumeStatusController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

resumeStatusRouter
  .route('/')
  .get(verifyAccessToken, resumeStatusController.getResumeStatuses);

module.exports = resumeStatusRouter;
