const { Router } = require('express');
const productsController = require('../controllers/productsController');
const nameValidation = require('../middlewares/nameValidation');

const productsRouter = Router();
productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);

productsRouter.post('/', nameValidation, productsController.registerProducts);

module.exports = productsRouter;