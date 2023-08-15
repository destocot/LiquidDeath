// THIS IS THE TOP COMPONENT FOR ALL REVIEWS AND RATINGS SECTION

import React, { useState, useEffect } from 'react';
import './ReviewsRatings.css';
import ReviewsList from './ReviewsList';
import RatingBreakdown from './RatingBreakdown';
import axios from 'axios';

import { getReviewsData } from './exampleData.js';

function ReviewsRatings({ reviewsMeta, currProductId, initial }) {
  const [reviews, setReviews] = useState(initial.reviews);
  const [filters, setFilters] = useState({ ratings: [] });
  const updateFilters = (obj) => {
    setFilters(obj);
  };

  // defaults to relevant sorting order - change sort to desired sort order
  const updReviews = async (sort = "relevant", count = "9999", page = "1") => {
    const newReviews = await axios.get(
      `/reviews/${currProductId}/${sort}/${count}/${page}`
    );
    return newReviews;
  };

  useEffect(() => {
    updReviews("relevant", "9999", "1")
      .then((result) => setReviews(result.data))
      .catch((err) => console.error(err));
  }, [currProductId]);

  const filteredReviews = reviews.results.filter((review) => filters.ratings.indexOf(review.rating) !== -1 || filters.ratings.length === 0);

  return (
    <div className="ratingsReviewsContainer" id="ratingsReviewsContainerId">
      <h2>Ratings & Reviews</h2>
      <div className="ratingsReviewsContent">
        <RatingBreakdown filters={filters} updateFilters={updateFilters} reviewsMeta={reviewsMeta}/>
        <ReviewsList filteredReviews={filteredReviews} filters={filters} reviewsMeta={reviewsMeta} />
      </div>
    </div>
  );
}

export default ReviewsRatings;
