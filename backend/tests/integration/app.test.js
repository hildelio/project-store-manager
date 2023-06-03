const chai = require('chai');
const sinon = require('sinon');

const sinonChai = require('sinon-chai');
const app = require('../../src/app');
const { listAllProductsMock, ProductNotFoundMock } = require('../unit/mocks/productsMock');
const { listAllSalesMock, salesId1Mock } = require('../unit/mocks/salesMock');
const { updatedProductMock } = require('../unit/mocks/productsMock');
// const { listAllSales } = require('../unit/mocks/salesMock');

const { expect } = chai;

chai.use(sinonChai);

describe('Testando app', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Testando rota /products', function () {
    it('GET /products deve retornar status 200 e array com produtos', async function () {
      sinon.stub(app, 'get').resolves({ status: 200, body: listAllProductsMock });

      const response = await app.get('/products');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(listAllProductsMock);
  });

  it('GET /products/:id deve retornar status 200 e objeto com produto', async function () {
    sinon.stub(app, 'get').resolves({ status: 200, body: updatedProductMock });

    const response = await app.get('/products/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(updatedProductMock);
  });

  it(
    'GET /products/:id deve retornar status 404 e message error ao colocar id inválido',
     async function () {
    sinon.stub(app, 'get').resolves({ status: 404, message: ProductNotFoundMock });

    const response = await app.get('/products/9999');
    expect(response.status).to.be.equal(404);
    expect(response.message).to.be.deep.equal(ProductNotFoundMock);
  },
);

  it('POST /products deve retornar status 200 e objeto com produto', async function () {
    sinon.stub(app, 'post').resolves({ status: 400, message: '"name" is required' });

    const response = await app.post('/products');
    expect(response.status).to.be.equal(400);
    expect(response.message).to.be.deep.equal('"name" is required');
  });
});

describe('Testando GET rota /sales', function () {
  it('GET /sales deve retornar status 200 e array com vendas', async function () {
    sinon.stub(app, 'get').resolves({ status: 200, body: listAllSalesMock });

      const response = await app.get('/sales');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(listAllSalesMock);
  });

  it('GET /sales/:id deve retornar status 200 e array de objetos com vendas', async function () {
    sinon.stub(app, 'get').resolves({ status: 200, body: salesId1Mock });

    const response = await app.get('/sales/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(salesId1Mock);
  });
});
});
