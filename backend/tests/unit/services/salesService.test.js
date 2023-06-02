const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const salesModel = require('../../../src/models/salesModel');
const productsModel = require('../../../src/models/productsModel');

const salesService = require('../../../src/services/salesService');
const { listAllSalesMock } = require('../mocks/salesMock');
const { listAllProductsMock } = require('../mocks/productsMock');

describe('Testes da camada services do sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Teste da Função getAll, receber um array com todas as vendas', async function () {
    sinon.stub(salesModel, 'getAll').resolves(listAllSalesMock);

    const result = await salesService.getAll();

    expect(result).to.be.deep.equal(listAllSalesMock);
  });
  
  it('Teste da Função getById, Id inexistente', async function () {
    sinon.stub(salesModel, 'getById').resolves(false);

    const result = await salesService.getById(99999);

    expect(result).to.be.equal(false);
  });
  
  it('Teste da Função getById, Id existente', async function () {
    sinon.stub(salesModel, 'getById').resolves([listAllSalesMock[2]]);

    const result = await salesService.getById(2);

    expect(result).to.be.deep.equal([listAllSalesMock[2]]);
  });

  it('Teste da Função registerSales', async function () {
    sinon.stub(productsModel, 'getAll').resolves(listAllProductsMock);
    sinon.stub(salesModel, 'registerSalesId').resolves(4);
    sinon.stub(salesModel, 'registerSales').resolves({ productId: 1, quantity: 5 });

    const newSale = await salesService.registerSales([{ productId: 1, quantity: 5 }]); 

    expect(newSale).to.be.deep.equal({ id: 4, itemsSold: [{ productId: 1, quantity: 5 }] });
  });
});