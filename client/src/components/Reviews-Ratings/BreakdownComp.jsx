import React from 'react';
import { useState } from 'react';

import { getReviewsMeta } from './exampleData.js'; // putting this here to until master updated with prev changes

function BreakdownComp({filters, updateFilters}) {
  // data comes from getReviewsMeta
  console.log({ filters });
  const filterByRatings = (key) => {
    key = Number(key);
    let prevFilters = filters.ratings;
    let indexOfKey = prevFilters.indexOf(key);

    if (indexOfKey === -1) {
      prevFilters.push(key);
    } else {
      prevFilters.splice(indexOfKey, 1);
    }
    updateFilters({ ratings: prevFilters});
  };

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
    return Object.keys(result).map((key) => (
      <div className="breakdownRating">
        <div id="breakdownLabel" onClick={() => filterByRatings(key)}>{key} stars</div>
        <progress id="breakdownBar" max="1" value={result[key] / sum}>a bar</progress>
      </div>
    ));
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

  const resetFilters = () => {
    updateFilters({ ratings: [] });
  };

  const filtersApplied = () => {
    const ratingsDivs = filters.ratings.map((filter) => <div>{filter + ' stars'}</div>);
    return (
      <div>
        Filters Applied:
        <div>{ratingsDivs}</div>
        <button onClick={resetFilters} type="button">Reset Filters</button>
      </div>
    );
  };

  // ben's star functionality goes here

  return (
    <div className="actualBreakdown">
      {/* <h2>Actual Breakdown</h2> */}
      {generateObj()}
      {filtersApplied()}
    </div>
  );
}

export default BreakdownComp;
