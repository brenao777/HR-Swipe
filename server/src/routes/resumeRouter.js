const { verifyAccessToken } = require('../middlewares/verifyTokens');
const resumeRouter = require('express').Router();
const resumeController = require('../controllers/resumeController');

resumeRouter
  .route('/')
  .get(verifyAccessToken, resumeController.getAllResumes)
  .post(verifyAccessToken, resumeController.createResume);

resumeRouter
  .route('/:id')
  .get(resumeController.getResumeById)
  .delete(verifyAccessToken, resumeController.deleteResume)
  .put(verifyAccessToken, resumeController.deleteResume);

module.exports = resumeRouter;
