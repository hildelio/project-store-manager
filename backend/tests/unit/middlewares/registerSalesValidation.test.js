const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { HTTP_STATUS } = require('../../../src/utils/httpStatus');

const registerSalesValidation = require('../../../src/middlewares/registerSalesValidation');

describe('Testes de middleware registerSalesValidation', function () {
  afterEach(function () {
    sinon.restore();
  });
it('Teste da Função registerSales, quantity menor que 1', async function () {
  const req = { body: [{ productId: 1, quantity: 0 }] };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub();

  await registerSalesValidation(req, res, next);

  expect(res.status).to.be.calledWith(HTTP_STATUS.UNPROCESSABLE_ENTITY);
  expect(res.json).to.be.calledWithExactly(
    { message: '"quantity" must be greater than or equal to 1' },
    );
});

it('Teste da Função registerSales, Bad Request', async function () {
  const req = { body: {} };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
const next = sinon.stub();

await registerSalesValidation(req, res, next);

expect(res.status).to.be.calledWith(HTTP_STATUS.BAD_REQUEST);
});

it('Teste da Função registerSales, sem erro', async function () {
  const req = { body: [{ productId: 1, quantity: 1 }] };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub();

  await registerSalesValidation(req, res, next);

  expect(next.called).to.be.equal(true);
});
});