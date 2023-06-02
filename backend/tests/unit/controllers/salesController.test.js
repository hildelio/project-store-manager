const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { listAllSalesMock,
  registerSalesMock,
  error404RegisterSalesMock } = require('../mocks/salesMock');

describe('Testes da camada controller do sales', function () {
  const req = {};
  const res = {};
  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  afterEach(function () {
    sinon.restore();
  });
  it('Teste da Função getAll, receber um array com todas as vendas', async function () {
    sinon.stub(salesService, 'getAll').resolves(listAllSalesMock);

    await salesController.getAll(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(listAllSalesMock);
  });

  it('Teste da Função getById, Id inexistente', async function () {
    req.params = { id: 9999 };
    sinon.stub(salesService, 'getById').resolves(false);

    await salesController.getById(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: 'Sale not found' });
  });
  
  it('Teste da Função getById, Id existente', async function () {
    req.params = { id: 1 };
    sinon.stub(salesService, 'getById').resolves(listAllSalesMock[0]);

    await salesController.getById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly(listAllSalesMock[0]);
  });

  it('Teste da Função registerProducts, input válido', async function () {
    req.body = registerSalesMock;
    sinon.stub(salesService, 'registerSales').resolves(registerSalesMock);

    await salesController.registerSales(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWithExactly(registerSalesMock);
  });

  it('Teste da Função registerProducts, input inválido', async function () {
    req.body = error404RegisterSalesMock;
    sinon.stub(salesService, 'registerSales').resolves({ message: 'Product not found' });

    await salesController.registerSales(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: 'Product not found' });
  });
});