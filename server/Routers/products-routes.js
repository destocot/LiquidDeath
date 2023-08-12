require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');

const productRouter = express.Router();

// get all products - specify count to absurd number - useful for product search feature (extra)
productRouter.get('/products', (req, res) => {
  axios.get(
    // add the base api url to .env for this to work
    path.join(process.env.API_URI, 'products'),
    {
      params: {
        count: 9999,
      },
      headers: {
        Authorization: process.env.AUTH,
      },
    },
  )
    .then((products) => res.status(200).send(products.data))
    .catch(res.status(400).send());
});

// get one product
productRouter.get('/products/:product_id', (req, res) => {
  axios.get(
    path.join(process.env.API_URI, 'products'),
    {
      params: {
        product_id: req.params.product_id,
      },
      headers: {
        Authorization: process.env.AUTH,
      },
    },
  )
    .then((product) => res.status(200).send(product.data))
    .catch(res.status(400).send());
});

// get product styles
productRouter.get('/products/:product_id/styles', (req, res) => {
  axios.get(
    path.join(process.env.API_URI, 'products'),
    {
      params: {
        // this one is strange - req.params.product_id below will refer to :product_id/styles
        // this will entail hardcoding product_id param when we initially send the GET from client
        // there's probably a cleaner workaround - going to leave as is for now though
        product_id: req.params.product_id,
      },
      headers: {
        Authorization: process.env.AUTH,
      },
    },
  )
    .then((styles) => res.status(200).send(styles.data))
    .catch(res.status(400).send());
});

// get related products
productRouter.get('/products/:product_id/related', (req, res) => {
  axios.get(
    path.join(process.env.API_URI, 'products'),
    {
      params: {
        // same as styles product_id param
        product_id: req.params.product_id,
      },
      headers: {
        Authorization: process.env.AUTH,
      },
    },
  )
    .then((related) => res.status(200).send(related.data))
    .catch(res.status(400).send());
});
