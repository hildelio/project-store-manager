const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const {
  listAllProductsMock,
  registerProductMock,
  updatedProductMock, 
  ProductNotFoundMock, 
 } = require('../mocks/productsMock');
const { HTTP_STATUS } = require('../../../src/utils/httpStatus');

describe('Testes da camada services do products', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Teste da Função getAll, receber um array com todos os produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(listAllProductsMock);

    const result = await productsService.getAll();

    expect(result).to.be.deep.equal({ type: HTTP_STATUS.OK, message: listAllProductsMock });
  });
  
  it('Teste da Função getById, Id inexistente', async function () {
    sinon.stub(productsModel, 'getById').resolves(false);

    const result = await productsService.getById(99999);

    expect(result).to.be.deep.equal(
      { type: HTTP_STATUS.NOT_FOUND, message: ProductNotFoundMock.message },
      );
  });
  
  it('Teste da Função getById, Id existente', async function () {
    sinon.stub(productsModel, 'getById').resolves(listAllProductsMock[0]);

    const result = await productsService.getById(1);

    expect(result).to.be.deep.equal({ type: HTTP_STATUS.OK, message: listAllProductsMock[0] });
  });

  it('Teste da Função registerProducts', async function () {
    sinon.stub(productsModel, 'registerProducts').resolves(4);
    sinon.stub(productsModel, 'getById').resolves(registerProductMock);

    const result = await productsService.registerProducts(registerProductMock);

    expect(result).to.be.deep.equal({ type: HTTP_STATUS.CREATED, message: registerProductMock });
  });

  it('Teste da Função updateProducts, id inexistente', async function () {
    sinon.stub(productsModel, 'getById').resolves(null);

    const result = await productsService.updateProducts(99999, { name: 'Alice' });

    expect(result).to.be.deep.equal(
      { type: HTTP_STATUS.NOT_FOUND, message: ProductNotFoundMock.message },
      );
  });
  
  it('Teste da Função updateProducts, id existente', async function () {
    sinon.stub(productsModel, 'updateProducts').resolves();
    sinon.stub(productsModel, 'getById').resolves(updatedProductMock);
    
    await productsService.updateProducts(1, { name: 'Alice' });

    await productsModel.getById(1);

    const result = await productsService.updateProducts(1, { name: 'Alice' });

    expect(result).to.be.deep.equal({ type: HTTP_STATUS.OK, message: updatedProductMock });
  });

  it('Teste da Função deleteProducts, id inexistente', async function () {
    sinon.stub(productsModel, 'getById').resolves(null);

    const result = await productsService.deleteProducts(99999, { name: 'Alice' });

    expect(result).to.be.deep.equal(
      { type: HTTP_STATUS.NOT_FOUND, message: ProductNotFoundMock.message },
    );
  });

  it('Teste da Função deleteProducts, id existente', async function () {
    sinon.stub(productsModel, 'getById').resolves(updatedProductMock);
    sinon.stub(productsModel, 'deleteProducts').resolves();
    
    const result = await productsService.deleteProducts(1);

    expect(result).to.be.deep.equal({ type: HTTP_STATUS.NO_CONTENT, message: true });
  });
});