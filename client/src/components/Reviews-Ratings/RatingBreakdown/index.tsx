import React, { useState } from 'react';
import BreakdownComp from './BreakdownComp';
import ProductBreakdown from './ProductBreakdown';
import { RatingBreakdownProps } from '../types';
import helpers from '../../../helpPlease';
const recommended = helpers.recommended;
const calcAvgRating = helpers.calcAvgRating;
const reviewStars = helpers.reviewStars;

// const reviewStars = (score: number = 5): JSX.Element => {
//   const stars = [];
//   const quarterRound = (num: number) => {
//     let quarters;
//     if (num > 0.625) {
//       quarters = 0.65;
//     } else if (num > 0.375) {
//       quarters = 0.5;
//     } else {
//       quarters = 0.35;
//     }
//     return quarters;
//   };
//   // adds to stars array
//   for (let i = 0; i < 5; i++) {
//     if (i < Math.floor(score)) {
//       stars.push(<i key={i} className="star fa-regular fa-star" />);
//     } else if (i - Math.floor(score) < 1 && i - score !== 0) {
//       // using base fa-star fontsize (18px)
//       const percent = (quarterRound((score - Math.floor(score))) * 18);
//       stars.push(<i key={i} className="star fa-regular fa-star" style={{ width: percent, marginRight: 18 - percent }} />);
//     } else {
//       stars.push(<i key={i} className="empty-star fa-regular fa-star" />);
//     }
//   }
//   return (
//     <div className="stars">{stars}</div>
//   );
// }

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
