import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app.css';
import QuestionsAndAnswers from './components/QuestionsAndAnswers';
import Overview from './components/Overview';
import ReviewsRatings from './components/Reviews-Ratings/ReviewsRatings';

function App() {
  /*
  ===== STATES AND STATE CHANGERS =====
  */
  // current product state - pass this (or id) as props for components to use
  const [product, setProduct] = useState({ id: 42, name: 'Liquid Death' });
  // other general states - these rerender when product changes
  const [styles, setStyles] = useState([]);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState({});
  const [reviewsMeta, setReviewsMeta] = useState({});

  const updStyles = async () => {
    const newStyles = await axios.get(`/products/${product.id}/styles`);
    return newStyles;
  };
  const updRelated = async () => {
    const newRelated = await axios.get(`/products/${product.id}/related`);
    return newRelated;
  };
  // defaults to relevant sorting order - use this in components with custom sorting order
  const updReviews = async (sort = 'relevant', count = '5', page = '1') => {
    const newReviews = await axios.get(`/reviews/${product.id}/${sort}/${count}/${page}`);
    return newReviews;
  };
  const updReviewsMeta = async () => {
    const newReviewsMeta = await axios.get(`/reviews/meta/${product.id}`);
    return newReviewsMeta;
  };

  /*
  ====== FUNCTIONALITY =====
  */
  // on initialization, render a placeholder product (ID 37324)
  useEffect(() => {
    axios.get('/products/37324')
      .then((result) => {
        setProduct(result.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // update states every time product changes
  useEffect(() => {
    if (product.name !== 'Liquid Death') {
      updStyles()
        .then((styleUpd) => setStyles(styleUpd.data.results))
        .then(() => updRelated())
        .then((relatedUpd) => setRelated(relatedUpd.data))
        .then(() => updReviews())
        .then((reviewsUpd) => setReviews(reviewsUpd.data.results))
        .then(() => updReviewsMeta())
        .then((reviewsMetaUpd) => setReviewsMeta(reviewsMetaUpd.data))
        .catch((err) => console.error(err));
    }
  }, [product]);

  // TESTING TESTING
  useEffect(() => {
    console.log('styles array: ', styles);
    console.log('related array: ', related);
    console.log('reviews array: ', reviews);
    console.log('reviews meta data: ', reviewsMeta);
    console.log('current product: ', product);
  }, [reviewsMeta]);

  return (
    <div>
      <Overview />
      <div id="ratingsReviewsContainerId">
        <ReviewsRatings />
      </div>
      <QuestionsAndAnswers />
      <h1>Jon Component</h1>
    </div>
  );
}

export default App;
