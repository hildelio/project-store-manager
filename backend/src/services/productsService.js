const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) {
    return false;
  }
  return result;
};

const registerProducts = async (name) => {
  const newId = await productsModel.registerProducts(name);
  const newProduct = await productsModel.getById(newId);
  return newProduct;
};

module.exports = { getAll, getById, registerProducts }; 