// THIS IS THE TOP COMPONENT FOR ALL REVIEWS AND RATINGS SECTION

import React, { useState, useEffect } from 'react';
import ReviewsList from './ReviewsList';
import RatingBreakdown from './RatingBreakdown';
import './ReviewsRatings.css';
import axios from 'axios';
import helpers from '../../helpPlease';

function ReviewsRatings({ reviewsMeta, currProductId, currProductName, initial }) {
  const sumHelper = helpers.sumHelper;
  const sortRelevance = helpers.sortRelevance1;
  const [reviews, setReviews] = useState(initial.reviews);
  const [filters, setFilters] = useState({ ratings: [] });

  const updateFilters = (obj) => {
    setFilters(obj);
  };

  // const tempArray = sortedFilteredReviews.slice(0);
  // const functionObjects = {
  //   'helpful': sortHelpfulness,
  //   'newest': sortNewest,
  //   'relevant': sortRelevance,
  // }
  // const value = event.target.value;
  // const sortMethod = functionObjects[value];
  // tempArray.sort(sortMethod);
  // updateSetSortedFilteredReviews(tempArray);

  const updReviews = (sort = "relevant", count = "9999", page = "1") => {
    axios.get(`/reviews/${currProductId}/${sort}/${count}/${page}`)
      .then((result) => {
        if (sort === "relevant") {
          console.log('calling sortRelevance');
          // setReviews(result.data);
          return sortRelevance(result.data);
          // call function passing in result
        } else {
          // setReviews(result.data);
          return result.data;
        }
      })
      .then((result) => setReviews(result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    updReviews("relevant", "9999", "1");
  }, [currProductId]);

  // console.log(reviews.results); // [ {}, {}, {} ]
  // console.log(filters); // [1, 2];
  const filteredReviews = reviews.results.filter((review) => filters.ratings.indexOf(review.rating) !== -1 || filters.ratings.length === 0);

  return (
    <div data-testid="test-1" className="ratingsReviewsContainer" id="ratingsReviewsContainerId">
      <h2>Ratings & Reviews</h2>
      <div className="ratingsReviewsContent">
        <RatingBreakdown filters={filters} updateFilters={updateFilters} reviewsMeta={reviewsMeta}/>
        <ReviewsList filteredReviews={filteredReviews} filters={filters} reviewsMeta={reviewsMeta} currProductName={currProductName} currProductId={currProductId} updReviews={updReviews} />
      </div>
    </div>
  );
}

export default ReviewsRatings;
