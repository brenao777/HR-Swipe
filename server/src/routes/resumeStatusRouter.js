const resumeStatusRouter = require('express').Router();
const resumeStatusController = require('../controllers/resumeStatusController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

resumeStatusRouter
  .route('/')
  .get(verifyAccessToken, resumeStatusController.getResumeStatuses);

  resumeStatusRouter
  .route('/:id')
  // .get(verifyAccessToken, resumeStatusController.getResumeStatusById)
  .put(verifyAccessToken, resumeStatusController.editResumeStatus)

module.exports = resumeStatusRouter;
