const { verifyAccessToken } = require('../middlewares/verifyTokens');
const resumeRouter = require('express').Router();
const resumeController = require('../controllers/resumeController');
const upload = require('../middlewares/multer');

resumeRouter
  .route('/')
  .get(verifyAccessToken, resumeController.getAllResumes)
  .post(verifyAccessToken, upload.single('photo'), resumeController.createResume);

resumeRouter
  .route('/:id')
  .get(verifyAccessToken, resumeController.getResumeById)
  .delete(verifyAccessToken, resumeController.deleteResume)
  // .put(verifyAccessToken, resumeController.updateResume);

module.exports = resumeRouter;
