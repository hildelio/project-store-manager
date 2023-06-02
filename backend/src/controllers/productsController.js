const productsService = require('../services/productsService');

const getAll = async (__req, res) => {
  const result = await productsService.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(id);
  if (!result) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(result);
};

const registerProducts = async (req, res) => {
  const { name } = req.body;
  const result = await productsService.registerProducts(name);
  return res.status(201).json(result);
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productsService.updateProducts(id, name);
  const { message } = result;
  if (message) {
    return res.status(404).json({ message });
  }
  return res.status(200).json(result);
};

module.exports = { getAll, getById, registerProducts, updateProducts };