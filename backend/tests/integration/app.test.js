// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../../src/app');
// const { listAllProducts } = require('../unit/mocks/productsMock');
// // const { listAllSales } = require('../unit/mocks/salesMock');

// const { expect } = chai;

// chai.use(chaiHttp);
// describe('Testando app', function () {
//   describe('Testando GET rota /products', function () {
//     it('GET /products deve retornar status 200 e array com produtos', async function () {
//       const response = await chai.request(app)
//       .get('/products');
//       expect(response.status).to.be.equal(200);
//       expect(response.body).to.be.deep.equal(listAllProducts);
//   });
// });

// // describe('Testando GET rota /sales', function () {
// //   it('GET /sales deve retornar status 200 e array com vendas', async function () {
// //     const response = await chai.request(app)
// //     .get('/sales');
// //     expect(response.status).to.be.equal(200);
// //     console.log(response.body);
// //     expect(response.body).to.be.deep.equal(listAllSales);
// //   });
// // });
// });
