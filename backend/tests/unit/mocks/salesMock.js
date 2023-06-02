const listAllSalesMock = [
  {
    saleId: 1,
    date: '2023-05-29T14:04:00.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-29T14:04:00.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-05-29T14:04:00.000Z',
    productId: 3,
    quantity: 15,
  },
];

const registerSalesMock = [
  {
    productId: 1,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const error404RegisterSalesMock = [
  {
    productId: 18,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 5,
  },
];
module.exports = { listAllSalesMock, registerSalesMock, error404RegisterSalesMock };