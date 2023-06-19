const listAllProductsMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const registerProductMock = {
  id: 4,
  name: 'Alice',
};

const updatedProductMock = {
  id: 1,
  name: 'Alice',
};

const ProductNotFoundMock = { message: 'Product not found' };

module.exports = {
  listAllProductsMock, registerProductMock, updatedProductMock, ProductNotFoundMock,
};