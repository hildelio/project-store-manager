const getAll = async () => {
  const result = await productsModel.getAll;
  return result;
};

module.exports = { getAll };