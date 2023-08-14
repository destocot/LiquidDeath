import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css';
import initial from './PlaceHolderData.js';
import QuestionsAndAnswers from './components/QuestionsAndAnswers';
import Overview from './components/Overview';
import ReviewsRatings from './components/Reviews-Ratings/ReviewsRatings';

function App() {
  /*
  ===== STATES AND STATE CHANGERS =====
  */
  // current product state - pass this (or id) as props for components to use
  const [product, setProduct] = useState(initial.product);
  // other general states - these rerender when product changes

  /*
  TODOS:
  - Move related state and updRelated fn to Jon's component
  - Move reviews state and updReviews fn to Kurt's component
  */
  const [related, setRelated] = useState(initial.related);
  const [reviews, setReviews] = useState(initial.reviews);
  const [reviewsMeta, setReviewsMeta] = useState(initial.reviewsMeta);

  const updRelated = async () => {
    const newRelated = await axios.get(`/products/${product.id}/related`);
    return newRelated;
  };
  // defaults to relevant sorting order - use this in components with custom sorting order
  const updReviews = async (sort = "relevant", count = "5", page = "1") => {
    const newReviews = await axios.get(
      `/reviews/${product.id}/${sort}/${count}/${page}`
    );
    return newReviews;
  };
  const updReviewsMeta = async () => {
    const newReviewsMeta = await axios.get(`/reviews/meta/${product.id}`);
    return newReviewsMeta;
  };

  /*
  ====== FUNCTIONALITY =====
  */

  // update reviewsMeta every time product changes
  useEffect(() => {
    if (product.name !== 'Liquid Death') {
      updReviewsMeta()
        .then((reviewsMetaUpd) => setReviewsMeta(reviewsMetaUpd.data))
        .catch((err) => console.error(err));
    }
  }, [product]);

  /*
  TODOS:
  - onCardClick fn that updates product
  //   axios.get('/products/:product_id')
  //     .then((result) => {
  //       setProduct(result.data);
  //     })
  //     .catch((err) => console.error(err));
  - onSearchProduct fn that updates product
  */

  // TESTING TESTING (changed how it logs information)
  useEffect(() => {
    console.log({
    'related array' : related,
    'reviews array' : reviews,
    'reviews meta data' : reviewsMeta,
    'current product' : product,
    });
  }, [reviewsMeta]);

  // changed order of components
  return (
    <div>
      <Overview product={product} reviewsMeta={reviewsMeta} />
      <h1>Jon Component</h1>
      <QuestionsAndAnswers currProductId={product.id} currProductName={product.name}/>
      <div id="ratingsReviewsContainerId">
        <ReviewsRatings />
      </div>
    </div>
  );
}

export default App;
