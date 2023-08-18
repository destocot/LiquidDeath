require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');
const multer = require('multer');

const reviewsRouter = express.Router();
axios.defaults.headers.common["Authorization"] = process.env.AUTH;

reviewsRouter.get('/:product_id/:sort/:count/:page', (req, res) => {
  axios.get(
    path.join(process.env.API_URI, 'reviews'),
    {
      params: {
        product_id: req.params.product_id,
        sort: req.params.sort || 'newest',
        count: req.params.count || 5,
        page: req.params.page || 1,
      },
    },
  )
    .then((product) => res.status(200).send(product.data))
    .catch((err) => res.status(400).send(err));
});

reviewsRouter.get('/meta/:product_id', (req, res) => {
  axios.get(
    path.join(process.env.API_URI, 'reviews/meta'),
    {
      params: {
        product_id: req.params.product_id,
      },
    },
  )
    .then((reviewsMeta) => res.status(200).send(reviewsMeta.data))
    .catch((err) => res.status(400).send(err));
});

// old post route
// reviewsRouter.post('/newreview', (req, res) => {
//   console.log('post request received!');
//   axios.post(
//     path.join(process.env.API_URI, 'reviews'),
//     req.body,
//   )
//   .then((result) => console.log('successfully posted review.'))
//   // .catch((err) => console.log(err));
//   .catch((err) => res.status(400).send(err));
// })

/* -- post w/ photos -- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../client/dist/Images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const reviewsPoster = (data, photos) => {
  const ph = photos.map((photo) => path.join("/Images", photo.filename));
  console.log('ph: ', ph);
  const uri = path.join(process.env.API_URI, 'reviews');
  console.log('uri: ', uri);
  data.photos = ph;
  // const uri = `${base_uri}/qa/questions/${questionId}/answers`;
  data.characteristics = JSON.parse(data.characteristics);
  data.product_id = JSON.parse(data.product_id);
  data.rating = JSON.parse(data.rating);
  data.recommend = JSON.parse(data.recommend);
  console.log(data);
  return axios.post(uri, data);
  // return axios.post(uri, { ...data, photos: ph });
};

reviewsRouter.post("/newreview",
  upload.array('imageFiles'),
  (req, res) => {
    console.log('post request received!');
    console.log('Form Fields:', req.body);
    // console.log('URL Parameters:', req.params);
    console.log('Uploaded Files:', req.files);
    reviewsPoster(req.body, req.files)
    .then((result) => console.log('successfully posted review.'))
    .catch((err) => console.log('nope.'))
    // .catch((err) => console.log(err));
    // .catch((err) => res.status(400).send(err));
  }
);


/* -- end -- */

reviewsRouter.put('/:review_id/helpful', (req, res) => {
  axios.put(
    path.join(process.env.API_URI, `reviews/${req.params.review_id}/helpful`),
  )
  .then((result) => console.log('successfully updated helpful'))
  .catch((err) => res.status(400).send(err));
})

reviewsRouter.put('/:review_id/report', (req, res) => {
  axios.put(
    path.join(process.env.API_URI, `reviews/${req.params.review_id}/report`),
  )
  .then((result) => console.log('successfully reported'))
  .catch((err) => res.status(400).send(err));
})

module.exports = reviewsRouter;
