const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const { listAllSales } = require('../mocks/salesMock');

describe('Testes da camada model do sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Teste da Função getAll, receber um array com todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([listAllSales]);

    const result = await salesModel.getAll();

    expect(result).to.be.deep.equal(listAllSales);
  });
  
  it('Teste da Função getById, receber uma venda solicitado através do Id', async function () {
    sinon.stub(connection, 'execute').resolves([[listAllSales[0]]]);

    const result = await salesModel.getById(1);

    expect(result).to.be.deep.equal(listAllSales[0]);
  });
});