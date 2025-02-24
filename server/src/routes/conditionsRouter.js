const express = require('express');
const conditionsController = require('../controllers/conditionsController');
const {verifyAccessToken} = require('../middlewares/verifyTokens');

const conditionsRouter = express.Router();

conditionsRouter.route('/').get(conditionsController.getAllConditions);
conditionsRouter.route('/').post(verifyAccessToken, conditionsController.createCondition);
conditionsRouter.route('/:id').get(verifyAccessToken, conditionsController.getConditionById);
conditionsRouter.route('/:id').put(verifyAccessToken, conditionsController.updateCondition);
conditionsRouter.route('/:id').delete(verifyAccessToken, conditionsController.deleteCondition);
conditionsRouter.route('/filter-vacancies').get(conditionsController.filterVacanciesByConditions);

module.exports = conditionsRouter;