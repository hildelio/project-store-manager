const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const { listAllProducts } = require('../mocks/productsMock');

describe('Testes da camada model do products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Teste da Função getAll, receber um array com todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([listAllProducts]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(listAllProducts);
  });
  
  it('Teste da Função getById, receber um produto solicitado através do Id', async function () {
    sinon.stub(connection, 'execute').resolves([[listAllProducts[0]]]);

    const result = await productsModel.getById(1);

    expect(result).to.be.deep.equal(listAllProducts[0]);
  });
});