const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { HTTP_STATUS } = require('../utils/httpStatus');

const getAll = async () => {
  const result = await salesModel.getAll();
  return { type: HTTP_STATUS.OK, message: result };
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (!result || !result.length) {
    return { type: HTTP_STATUS.NOT_FOUND, message: 'Sale not found' };
  }
  return { type: HTTP_STATUS.OK, message: result };
};

const registerSales = async (sales) => {
  const products = await productsModel.getAll();
  const productsId = products.map((p) => p.id);
  
  if (sales.some((p) => p.quantity <= 0 || p.productId <= 0) 
      || sales.some((p) => !productsId.includes(p.productId))) {
    return { type: HTTP_STATUS.NOT_FOUND, message: 'Product not found' };
  }

  const newId = await salesModel.registerSalesId();

  const newSale = sales.map((p) => salesModel.registerSales(newId, p.productId, p.quantity));
  
  const itemsSold = await Promise.all(newSale);
  
  return { type: HTTP_STATUS.CREATED, message: { id: newId, itemsSold } };
};

module.exports = { getAll, getById, registerSales }; 