const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const { listAllSalesMock } = require('../mocks/salesMock');

describe('Testes da camada model do sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Teste da Função getAll, receber um array com todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([listAllSalesMock]);

    const result = await salesModel.getAll();

    expect(result).to.be.deep.equal(listAllSalesMock);
  });
  
  it('Teste da Função getById, receber uma venda solicitado através do Id', async function () {
    sinon.stub(connection, 'execute').resolves([listAllSalesMock[2]]);

    const result = await salesModel.getById(2);
    expect(result).to.be.deep.equal(listAllSalesMock[2]);
  });

  it(
    'Teste da Função registerSalesId, cadastrar novo Id',
      async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    
        const result = await salesModel.registerSalesId(4, 1, 5);
    
        expect(result).to.be.deep.equal(4);
      },
    );

  it(
    'Teste da Função registerSales, cadastrar uma venda',
      async function () {
        sinon.stub(connection, 'execute').resolves();
    
        const result = await salesModel.registerSales(4, 1, 5);
    
        expect(result).to.be.deep.equal({ productId: 1, quantity: 5 });
      },
    );
});