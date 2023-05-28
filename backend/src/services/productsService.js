const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  console.log(result);
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) {
    return false;
  }
  return result;
};

module.exports = { getAll, getById };