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

const updateProducts = async (id, name) => {
  const products = await productsModel.getAll();
  const productsId = products.map((product) => product.id);
  if (id > 0 && !productsId.includes(+id)) {
    return { message: 'Product not found' };
  }
  await productsModel.updateProducts(id, name);
  const updatedProduct = await productsModel.getById(id);
  return updatedProduct;
};

const deleteProducts = async (id) => {
  const products = await productsModel.getAll();
  const productsId = products.map((product) => product.id);
  if (id > 0 && !productsId.includes(+id)) {
    return { message: 'Product not found' };
  }
  await productsModel.deleteProducts(id);
  return true;
};

module.exports = { getAll, getById, registerProducts, updateProducts, deleteProducts }; 