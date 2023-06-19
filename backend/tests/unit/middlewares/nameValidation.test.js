const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { HTTP_STATUS } = require('../../../src/utils/httpStatus');

const nameValidation = require('../../../src/middlewares/nameValidation');

describe('Testes de middleware nameValidation', function () {
  afterEach(function () {
    sinon.restore();
  });
it('Teste da Função registerProducts, name vazio', async function () {
  const req = { body: { name: {} } };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub();

  await nameValidation(req, res, next);

  expect(res.status).to.be.calledWith(HTTP_STATUS.UNPROCESSABLE_ENTITY);
  expect(res.json).to.be.calledWithExactly({ message: '"name" must be a string' });
});

it('Teste da Função registerProducts, name inexistente', async function () {
  const req = { body: {} };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
const next = sinon.stub();

await nameValidation(req, res, next);

expect(res.status).to.be.calledWith(HTTP_STATUS.BAD_REQUEST);
expect(res.json).to.be.calledWithExactly({ message: '"name" is required' });
});

it('Teste da Função registerProducts, próximo middleware chamado', async function () {
  const req = { body: { name: 'Product Name' } };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub();

  await nameValidation(req, res, next);

  expect(next.called).to.be.equal(true);
});
});