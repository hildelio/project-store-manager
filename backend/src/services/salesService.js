const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (!result || !result.length) {
    return false;
  }
  return result;
};

const registerSales = async (sales) => {
  const products = await productsModel.getAll();
  const productsId = products.map((product) => product.id);
  if (sales.every((product) => product.quantity > 0 && product.productId > 0)
  && !sales.every((product) => productsId.includes(product.productId))) {
    return { message: 'Product not found' };
  }
  const newId = await salesModel.registerSalesId();
  const newSale = sales
  .map((product) => salesModel.registerSales(newId, product.productId, product.quantity));
  const result = await Promise.all(newSale);
  const sale = {
    id: newId,
    itemsSold: result,
  };
  return sale;
};

module.exports = { getAll, getById, registerSales }; 