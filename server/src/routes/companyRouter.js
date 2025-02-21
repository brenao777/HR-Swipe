const { verifyAccessToken } = require('../middlewares/verifyTokens');
const companyRouter = require('express').Router();
const companyController = require('../controllers/companyController');

companyRouter
  .route('/')
  .get(verifyAccessToken, companyController.getAllCompany)
  .post(verifyAccessToken, companyController.createCompany);

  companyRouter
  .route('/:id')
  .get(companyController.getCompanyById)
  .delete(verifyAccessToken, companyController.deleteCompany)
  .put(verifyAccessToken, companyController.updateCompany);

module.exports = companyRouter;