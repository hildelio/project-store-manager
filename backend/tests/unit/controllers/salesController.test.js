const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { listAllSalesMock,
  registerSalesMock,
  error404RegisterSalesMock, 
  saleNotFoundMock } = require('../mocks/salesMock');
const { HTTP_STATUS } = require('../../../src/utils/httpStatus');
const { ProductNotFoundMock } = require('../mocks/productsMock');

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
    sinon.stub(salesService, 'getAll').resolves(
      { type: HTTP_STATUS.OK, message: listAllSalesMock },
      );

    await salesController.getAll(req, res);

    expect(res.status).to.be.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.be.calledWithExactly(listAllSalesMock);
  });

  it('Teste da Função getById, Id inexistente', async function () {
    req.params = { id: 9999 };
    sinon.stub(salesService, 'getById').resolves(
      { type: HTTP_STATUS.NOT_FOUND, message: saleNotFoundMock.message },
      );

    await salesController.getById(req, res);

    expect(res.status).to.be.calledWith(HTTP_STATUS.NOT_FOUND);
    expect(res.json).to.be.calledWithExactly(saleNotFoundMock);
  });
  
  it('Teste da Função getById, Id existente', async function () {
    req.params = { id: 1 };
    sinon.stub(salesService, 'getById').resolves(
      { type: HTTP_STATUS.OK, message: listAllSalesMock[0] },
      );

    await salesController.getById(req, res);

    expect(res.status).to.be.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.be.calledWithExactly(listAllSalesMock[0]);
  });

  it('Teste da Função registerProducts, input válido', async function () {
    req.body = registerSalesMock;
    sinon.stub(salesService, 'registerSales').resolves(
      { type: HTTP_STATUS.CREATED, message: registerSalesMock },
      );

    await salesController.registerSales(req, res);

    expect(res.status).to.be.calledWith(HTTP_STATUS.CREATED);
    expect(res.json).to.be.calledWithExactly(registerSalesMock);
  });

  it('Teste da Função registerProducts, input inválido', async function () {
    req.body = error404RegisterSalesMock;
    sinon.stub(salesService, 'registerSales').resolves(
      { type: HTTP_STATUS.NOT_FOUND, message: ProductNotFoundMock.message },
      );

    await salesController.registerSales(req, res);

    expect(res.status).to.be.calledWith(HTTP_STATUS.NOT_FOUND);
    expect(res.json).to.be.calledWithExactly(ProductNotFoundMock);
  });
});