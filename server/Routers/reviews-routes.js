require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');

const productRouter = express.Router();

// get all products - specify count to absurd number
productRouter.get('/products', (req, res) => {
  axios.get(path.join(process.env.API_URI, 'products'), { params: { count: 9999 } })
    .then((products) => res.status(200).send(products.data))
    .catch(res.status(400).send());
});

// get one product
productRouter.get('/products/:product_id', (req, res) => {
  axios.get(path.join(process.env.API_URI, 'products', req.params.product_id))
    .then((product) => res.status(200).send(product.data))
    .catch(res.status(400).send());
});

// get product styles
productRouter.get('/products/:product_id/styles', (req, res) => {
  axios.get(path.join(process.env.API_URI, 'products', req.params.product_id, 'styles'))
    .then((styles) => res.status(200).send(styles.data))
    .catch(res.status(400).send());
});

// get related products
productRouter.get('/products/:product_id/related', (req, res) => {
  axios.get(path.join(process.env.API_URI, 'products', req.params.product_id, 'related'))
    .then((related) => res.status(200).send(related.data))
    .catch(res.status(400).send());
});
