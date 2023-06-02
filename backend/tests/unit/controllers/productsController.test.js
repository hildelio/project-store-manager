const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const { listAllProductsMock, registerProductMock } = require('../mocks/productsMock');

describe('Testes da camada controller do products', function () {
  const req = {};
  const res = {};
  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  afterEach(function () {
    sinon.restore();
  });
  it('Teste da Função getAll, receber um array com todos os produtos', async function () {
    sinon.stub(productsService, 'getAll').resolves(listAllProductsMock);

    await productsController.getAll(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(listAllProductsMock);
  });

  it('Teste da Função getById, Id inexistente', async function () {
    req.params = { id: 9999 };
    sinon.stub(productsService, 'getById').resolves(false);

    await productsController.getById(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: 'Product not found' });
  });
  
  it('Teste da Função getById, Id existente', async function () {
    req.params = { id: 1 };
    sinon.stub(productsService, 'getById').resolves(listAllProductsMock[0]);

    await productsController.getById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(listAllProductsMock[0]);
  });
  
  it('Teste da Função registerProducts', async function () {
    req.body = { name: 'Alice' };
    sinon.stub(productsService, 'registerProducts').resolves(registerProductMock);

    await productsController.registerProducts(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWithExactly(registerProductMock);
  });
});