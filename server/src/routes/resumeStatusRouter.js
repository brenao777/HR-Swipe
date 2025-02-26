const resumeStatusRouter = require('express').Router();
const resumeStatusController = require('../controllers/resumeStatusController');

resumeStatusRouter
  .route('/')
  .get( resumeStatusController.getResumeStatuses);

module.exports = resumeStatusRouter;
