const { Router } = require('express');
const salesController = require('../controllers/salesController');
const registerSalesValidation = require('../middlewares/registerSalesValidation');

const salesRouter = Router();
salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);

salesRouter.post('/', registerSalesValidation, salesController.registerSales);

module.exports = salesRouter;