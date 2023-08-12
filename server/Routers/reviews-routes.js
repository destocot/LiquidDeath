require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');

const reviewsRouter = express.Router();

// get all reviews for a product - specify count to absurd number
reviewsRouter.get('/reviews/:product_id', (req, res) => {
  axios.get(
    path.join(process.env.API_URI, 'reviews'),
    {
      params: {
        product_id: req.params.product_id,
        count: 9999,
      },
      headers: {
        Authorization: process.env.AUTH,
      },
    },
  )
    .then((reviews) => res.status(200).send(reviews.data))
    .catch(res.status(400).send());
});

// get review metadata
reviewsRouter.get('/reviews/meta/:product_id', (req, res) => {
  axios.get(
    path.join(process.env.API_URI, 'reviews/meta'),
    {
      params: {
        product_id: req.params.product_id,
      },
      headers: {
        Authorization: process.env.AUTH,
      },
    },
  )
    .then((reviews) => res.status(200).send(reviews.data))
    .catch(res.status(400).send());
});

/*
======= TODO =======
- Add POST request for reviews
- Add PUT request for reviews to check for if review was helpful
- Add PUT request for reviews to report a review
*/
