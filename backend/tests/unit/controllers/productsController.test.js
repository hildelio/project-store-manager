const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const {
  listAllProductsMock,
  registerProductMock,
  updatedProductMock, 
  ProductNotFoundMock } = require('../mocks/productsMock');

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
    expect(res.json).to.be.calledWithExactly(ProductNotFoundMock);
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

  it('Teste da Função updateProducts, Id inexistente', async function () {
    req.params = { id: 9999 };
    req.body = { name: 'Alice' };

    sinon.stub(productsService, 'updateProducts').resolves(ProductNotFoundMock);

    await productsController.updateProducts(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly(ProductNotFoundMock);
  });
  
  it('Teste da Função updateProducts, Id existente', async function () {
    req.params = { id: 1 };
    req.body = { name: 'Alice' };

    sinon.stub(productsService, 'updateProducts').resolves(updatedProductMock);

    await productsController.updateProducts(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(updatedProductMock);
  });

  it('Teste da Função deleteProducts, Id inexistente', async function () {
    req.params = { id: 9999 };

    sinon.stub(productsService, 'deleteProducts').resolves(ProductNotFoundMock);

    await productsController.deleteProducts(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly(ProductNotFoundMock);
  });
  
  it('Teste da Função deleteProducts, Id existente', async function () {
    req.params = { id: 1 };

    sinon.stub(productsService, 'deleteProducts').resolves(true);

    await productsController.deleteProducts(req, res);

    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.calledWithExactly(true);
  });
});