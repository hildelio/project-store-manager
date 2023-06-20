const salesService = require('../services/salesService');
const { handleResponse, handleResponseWithoutMessage } = require('../utils/handleResponse');

const getAll = async (__req, res) => {
  const response = await salesService.getAll();
  return handleResponse(res, response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getById(id);
  return handleResponse(res, response);
};

const registerSales = async (req, res) => {
  const response = await salesService.registerSales(req.body);
  return handleResponse(res, response);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.deleteSale(id);
  return handleResponseWithoutMessage(res, response);
};

module.exports = { getAll, getById, registerSales, deleteSale };
