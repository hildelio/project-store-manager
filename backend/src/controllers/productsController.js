const productsService = require('../services/productsService');
const { handleResponse } = require('../utils/handleResponse');

const getAll = async (__req, res) => {
  const response = await productsService.getAll();
  return handleResponse(res, response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getById(id);
  return handleResponse(res, response);
};

const registerProducts = async (req, res) => {
  const { name } = req.body;
  const response = await productsService.registerProducts(name);
  return handleResponse(res, response);
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const response = await productsService.updateProducts(id, name);
  return handleResponse(res, response);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.deleteProducts(id);
  return handleResponse(res, response);
};

module.exports = { getAll, getById, registerProducts, updateProducts, deleteProducts };