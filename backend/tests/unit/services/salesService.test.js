const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const { listAllSales } = require('../mocks/salesMock');

describe('Testes da camada services do sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Teste da Função getAll, receber um array com todas as vendas', async function () {
    sinon.stub(salesModel, 'getAll').resolves(listAllSales);

    const result = await salesService.getAll();

    expect(result).to.be.deep.equal(listAllSales);
  });
  
  it('Teste da Função getById, Id inexistente', async function () {
    sinon.stub(salesModel, 'getById').resolves(false);

    const result = await salesService.getById(99999);

    expect(result).to.be.equal(false);
  });
  
  it('Teste da Função getById, Id existente', async function () {
    sinon.stub(salesModel, 'getById').resolves(listAllSales[0]);

    const result = await salesService.getById(1);

    expect(result).to.be.deep.equal(listAllSales[0]);
  });
});