const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const { listAllProductsMock } = require('../mocks/productsMock');
const { registerProductMock } = require('../mocks/productsMock');

describe('Testes da camada model do products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Teste da Função getAll, receber um array com todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([listAllProductsMock]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(listAllProductsMock);
  });
  
  it('Teste da Função getById, receber um produto solicitado através do Id', async function () {
    sinon.stub(connection, 'execute').resolves([[listAllProductsMock[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(listAllProductsMock[0]);
  });

  it(
'Teste da Função registerProducts, cadastrar um produto através do name',
  async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productsModel.registerProducts(registerProductMock);

    expect(result).to.be.equal(4);
  },
);
it(
'Teste da Função updateProducts, atualizar um produto através do name',
  async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productsModel.updateProducts(1, registerProductMock.name);

    expect(result).to.be.equal(1);
  },
);

it(
  'Teste da Função deleteProducts, atualizar um produto através do name',
    async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
  
      const result = await productsModel.deleteProducts(1);
  
      expect(result).to.be.equal(1);
    },
  );
});