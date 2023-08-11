import React from 'react';
import { useState } from 'react';
import BreakdownComp from './BreakdownComp';

import { getReviewsMeta } from './exampleData.js'; // putting this here to until master updated with prev changes

function RatingBreakdown(/* props when getReviewsMeta is moved */) {
  // data comes from getReviewsMeta
  const calcAvgRating = (ratingsObj) => {
    if (Object.keys(ratingsObj).length > 0) {
      let sumOfRatings = 0;
      let product = 0;
      for (var key in ratingsObj) {
        let rating = key;
        let numberOfRatings = ratingsObj[key];
        product += rating * numberOfRatings;
        sumOfRatings += numberOfRatings;
      }
      let avgRating = product / sumOfRatings;
      avgRating = Math.round(avgRating * 10) / 10;
      return avgRating;
    }
  };

  // ben's star functionality goes here

  return (
    <div className="ratingBreakdown">
      <h2>Rating Breakdown</h2>
      <div>{calcAvgRating(getReviewsMeta.ratings)} ⭐⭐⭐⭐</div>
      <BreakdownComp />
      <div>Filters Applied</div>
      <div>Reset Filters</div>
      <div>Product Breakdown</div>
    </div>
  );
}

export default RatingBreakdown;
