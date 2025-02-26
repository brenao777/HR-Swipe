const { verifyAccessToken } = require('../middlewares/verifyTokens');
const express = require('express');
const companyController = require('../controllers/companyController');

const companyRouter = express.Router();


companyRouter
  .route('/')
  .get(verifyAccessToken, companyController.getAllCompany) 
  .post(verifyAccessToken, companyController.createCompany); 

companyRouter
  .route('/:userId')
  .get(verifyAccessToken, companyController.getCompanyById) 
  .delete(verifyAccessToken, companyController.deleteCompany) 
  .put(verifyAccessToken, companyController.updateCompany); 

module.exports = companyRouter;