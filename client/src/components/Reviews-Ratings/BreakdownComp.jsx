import React from 'react';
import { useState } from 'react';

import { getReviewsMeta } from './exampleData.js'; // putting this here to until master updated with prev changes

function BreakdownComp(/* props when getReviewsMeta is moved */) {
  // data comes from getReviewsMeta

  // sum helper
  const sumHelper = (array) => {
    let sum = 0;
    for (var i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum;
  };

  const generateObj = () => {
    const result = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};

    // update result object w/ actual values
    for (var key in getReviewsMeta.ratings) {
      result[key] = getReviewsMeta.ratings[key];
    };

    // calculate sum of ratings to use later
    let sum = sumHelper(Object.values(result));

    // map jsx
    return Object.keys(result).map((key) => {
      console.log('result @ key ', result[key]);
      console.log({sum})
      console.log(result[key] / sum);
      return (
        <div className="breakdownRating">
        <div id="breakdownLabel">{key} stars</div>
        <progress id="breakdownBar" max="1" value={result[key]/sum}>a bar</progress>
      </div>
      )
    })
  };

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
    <div className="actualBreakdown">
      {/* <h2>Actual Breakdown</h2> */}
      {/* {breakdown(getReviewsMeta.ratings)} */}
      {generateObj()}
      {/* <div className="breakdownRating">
        <div id="breakdownLabel">5 stars</div>
        <progress id="breakdownBar" max="100" value={70}>a bar</progress>
      </div>
      <div className="breakdownRating">
        <div id="breakdownLabel">4 stars</div>
        <div id="breakdownBar">a bar</div>
      </div> */}
      {/* <div className="breakdownRating">
        <div id="breakdownLabel">3 stars</div>
        <div id="breakdownBar">a bar</div>
      </div>
      <div className="breakdownRating">
        <div id="breakdownLabel">2 stars</div>
        <div id="breakdownBar">a bar</div>
      </div>
      <div className="breakdownRating">
        <div id="breakdownLabel">1 star</div>
        <div id="breakdownBar">a bar</div>
      </div> */}
    </div>
  );
}

export default BreakdownComp;
