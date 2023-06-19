const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const salesModel = require('../../../src/models/salesModel');
const productsModel = require('../../../src/models/productsModel');

const salesService = require('../../../src/services/salesService');
const { listAllSalesMock, saleNotFoundMock } = require('../mocks/salesMock');
const { listAllProductsMock, ProductNotFoundMock } = require('../mocks/productsMock');
const { HTTP_STATUS } = require('../../../src/utils/httpStatus');

describe('Testes da camada services do sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Teste da Função getAll, receber um array com todas as vendas', async function () {
    sinon.stub(salesModel, 'getAll').resolves(listAllSalesMock);

    const result = await salesService.getAll();

    expect(result).to.be.deep.equal({ type: HTTP_STATUS.OK, message: listAllSalesMock });
  });
  
  it('Teste da Função getById, Id inexistente', async function () {
    sinon.stub(salesModel, 'getById').resolves([]);

    const result = await salesService.getById(99999);

    expect(result).to.be.deep.equal(
      { type: HTTP_STATUS.NOT_FOUND, message: saleNotFoundMock.message },
      );
  });
  
  it('Teste da Função getById, Id existente', async function () {
    sinon.stub(salesModel, 'getById').resolves([listAllSalesMock[2]]);

    const result = await salesService.getById(2);

    expect(result).to.be.deep.equal({ type: HTTP_STATUS.OK, message: [listAllSalesMock[2]] });
  });

  it('Teste da Função registerSales, id inexistente', async function () {
    sinon.stub(productsModel, 'getAll').resolves(listAllProductsMock);

    const result = await salesService.registerSales([{ productId: 9999, quantity: 5 }]); 

    expect(result).to.be.deep.equal(
      { type: HTTP_STATUS.NOT_FOUND, message: ProductNotFoundMock.message },
      );
  });

  it('Teste da Função registerSales, id existente', async function () {
    sinon.stub(productsModel, 'getAll').resolves(listAllProductsMock);
    sinon.stub(salesModel, 'registerSalesId').resolves(4);
    sinon.stub(salesModel, 'registerSales').resolves({ productId: 1, quantity: 5 });

    const newSale = await salesService.registerSales([{ productId: 1, quantity: 5 }]); 

    expect(newSale).to.be.deep.equal(
      { type: HTTP_STATUS.CREATED, message: { id: 4, itemsSold: [{ productId: 1, quantity: 5 }] } },
      );
  });
});