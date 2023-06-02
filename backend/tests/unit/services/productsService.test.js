const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const { listAllProductsMock, registerProductMock } = require('../mocks/productsMock');

describe('Testes da camada services do products', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Teste da Função getAll, receber um array com todos os produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(listAllProductsMock);

    const result = await productsService.getAll();

    expect(result).to.be.deep.equal(listAllProductsMock);
  });
  
  it('Teste da Função getById, Id inexistente', async function () {
    sinon.stub(productsModel, 'getById').resolves(false);

    const result = await productsService.getById(99999);

    expect(result).to.be.equal(false);
  });
  
  it('Teste da Função getById, Id existente', async function () {
    sinon.stub(productsModel, 'getById').resolves(listAllProductsMock[0]);

    const result = await productsService.getById(1);

    expect(result).to.be.deep.equal(listAllProductsMock[0]);
  });

  it('Teste da Função registerProducts', async function () {
    sinon.stub(productsModel, 'registerProducts').resolves(4);
    sinon.stub(productsModel, 'getById').resolves(registerProductMock);

    const result = await productsService.registerProducts({ name: 'Alice' });

    expect(result).to.be.deep.equal(registerProductMock);
  });
});