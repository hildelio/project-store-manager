const productsModel = require('../models/productsModel');
const { HTTP_STATUS } = require('../utils/httpStatus');

const getAll = async () => {
  const result = await productsModel.getAll();
  return { type: HTTP_STATUS.OK, message: result };
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) {
    return { type: HTTP_STATUS.NOT_FOUND, message: 'Product not found' }; 
  }
  return { type: HTTP_STATUS.OK, message: result };
};

const registerProducts = async (name) => {
  const newId = await productsModel.registerProducts(name);
  const newProduct = await productsModel.getById(newId);
  return { type: HTTP_STATUS.CREATED, message: newProduct };
};

const updateProducts = async (id, name) => {
  const existingProduct = await productsModel.getById(id);
  if (!existingProduct) {
    return { type: HTTP_STATUS.NOT_FOUND, message: 'Product not found' };
  }
  await productsModel.updateProducts(id, name);
  const updatedProduct = await productsModel.getById(id);
  return { type: HTTP_STATUS.OK, message: updatedProduct };
};

const deleteProducts = async (id) => {
  const existingProduct = await productsModel.getById(id);
  if (!existingProduct) {
    return { type: HTTP_STATUS.NOT_FOUND, message: 'Product not found' };
  }
  await productsModel.deleteProducts(id);
  return { type: HTTP_STATUS.NO_CONTENT, message: true };
};

module.exports = { getAll, getById, registerProducts, updateProducts, deleteProducts }; 