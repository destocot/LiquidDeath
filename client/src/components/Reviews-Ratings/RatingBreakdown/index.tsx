import React, { useState } from 'react';
import BreakdownComp from './BreakdownComp';
import ProductBreakdown from './ProductBreakdown';
import { RatingBreakdownProps } from '../types';
import helpers from '../../../helpPlease';
const recommended = helpers.recommended;
const calcAvgRating = helpers.calcAvgRating;
const reviewStars = helpers.reviewStars;

const RatingBreakdown: React.FC<RatingBreakdownProps> = ({filters, updateFilters, reviewsMeta}) => {
  const avgRating = calcAvgRating(reviewsMeta.ratings);

  return (
    <div className="ratingBreakdown">
      <div className="stars-container">
        <h1 className="text-6xl font-bold text-[#1d1a4d]">{avgRating}</h1>
        <div>{reviewStars(avgRating)}</div>
      </div>
      <div><span>{recommended(reviewsMeta.recommended)}</span><span> of reviewers recommend this product.</span></div>
      <BreakdownComp filters={filters} updateFilters={updateFilters} reviewsMeta={reviewsMeta} />
      <ProductBreakdown reviewsMeta={reviewsMeta} />
    </div>
  );
}

export default RatingBreakdown;
