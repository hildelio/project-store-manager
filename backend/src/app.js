const express = require('express');

const app = express();

const productsRouter = require('./routes/productsRoute'); 

app.use(express.json());

app.use('/products', productsRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
