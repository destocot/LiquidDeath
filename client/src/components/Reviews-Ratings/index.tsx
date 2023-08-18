// THIS IS THE TOP COMPONENT FOR ALL REVIEWS AND RATINGS SECTION

import React, { useState, useEffect } from 'react';
import ReviewsList from './ReviewsList';
import RatingBreakdown from './RatingBreakdown';
import './ReviewsRatings.css';
import axios from 'axios';
import helpers from '../../helpPlease';

function ReviewsRatings({ reviewsMeta, currProductId, currProductName, initial }) {
  // console.log({reviewsMeta});
  // console.log({currProductId});
  // console.log({currProductName});
  // console.log({initial});
  const sortRelevance = helpers.sortRelevance;
  const [reviews, setReviews] = useState(initial.reviews);
  const [filters, setFilters] = useState({ ratings: [] });

  const updateFilters = (obj) => {
    setFilters(obj);
  };

  const updReviews = (sort = "relevant", count = "9999", page = "1") => {
    axios.get(`/reviews/${currProductId}/${sort}/${count}/${page}`)
      .then((result) => {
        if (sort === "relevant") {
          const resultObj = result;
          const sortedArray = sortRelevance(result.data.results);
          resultObj.results = sortedArray;
          return resultObj;
        } else {
          return result.data;
        }
      })
      .then((result) => setReviews(result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    updReviews("relevant", "9999", "1");
  }, [currProductId]);

  const filteredReviews = reviews.results.filter((review) => filters.ratings.indexOf(review.rating) !== -1 || filters.ratings.length === 0);

  return (
    <div data-testid="test-1" className="ratingsReviewsContainer" id="ratingsReviewsContainerId">
      <h2 className="h-[5vh] text-[2rem]">RATINGS & REVIEWS</h2>
      <div className="ratingsReviewsContent">
        <RatingBreakdown filters={filters} updateFilters={updateFilters} reviewsMeta={reviewsMeta}/>
        <ReviewsList filteredReviews={filteredReviews} filters={filters} reviewsMeta={reviewsMeta} currProductName={currProductName} currProductId={currProductId} updReviews={updReviews} />
      </div>
    </div>
  );
}

export default ReviewsRatings;
