import React, { useState } from 'react';
import BreakdownComp from './BreakdownComp';
import ProductBreakdown from './ProductBreakdown';
import helpers from '../../../helpPlease';
const sumHelper = helpers.sumHelper;

const reviewStars = (score) => {
  const stars = [];
  const quarterRound = (num) => {
    let quarters;
    if (num > 0.625) {
      quarters = 0.65;
    } else if (num > 0.375) {
      quarters = 0.5;
    } else {
      quarters = 0.35;
    }
    return quarters;
  };
  // adds to stars array
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(score)) {
      stars.push(<i key={i} className="star fa-regular fa-star" />);
    } else if (i - Math.floor(score) < 1 && i - score !== 0) {
      // using base fa-star fontsize (18px)
      const percent = (quarterRound((score - Math.floor(score))) * 18);
      stars.push(<i key={i} className="star fa-regular fa-star" style={{ width: percent, marginRight: 18 - percent }} />);
    } else {
      stars.push(<i key={i} className="empty-star fa-regular fa-star" />);
    }
  }
  return (
    <div className="stars">{stars}</div>
  );
}

function RatingBreakdown({filters, updateFilters, reviewsMeta}) {
  // console.log({reviewsMeta});
  const calcAvgRating = (ratingsObj) => {
    if (Object.keys(ratingsObj).length > 0) {
      let sumOfRatings = 0;
      let product = 0;
      for (var key in ratingsObj) {
        let rating = key;
        let numberOfRatings = Number(ratingsObj[key]);
        product += rating * numberOfRatings;
        sumOfRatings += numberOfRatings;
      }
      let avgRating = product / sumOfRatings;
      avgRating = Math.round(avgRating * 10) / 10;
      return avgRating;
    }
  };

  const avgRating = calcAvgRating(reviewsMeta.ratings);

  const recommended = () => {
    let total = sumHelper(Object.values(reviewsMeta.recommended));
    let decimal = reviewsMeta.recommended.true / total;
    return (decimal.toFixed(2) * 100).toString() + '%';
  }

  return (
    <div className="ratingBreakdown">
      <div className="stars-container">
        <h1 className="text-6xl font-bold text-[#14532d]">{avgRating}</h1>
        <div>{reviewStars(avgRating)}</div>
      </div>
      <div><span>{recommended()}</span><span> of reviewers recommend this product.</span></div>
      <BreakdownComp filters={filters} updateFilters={updateFilters} reviewsMeta={reviewsMeta} />
      <ProductBreakdown reviewsMeta={reviewsMeta} />
    </div>
  );
}

export default RatingBreakdown;
