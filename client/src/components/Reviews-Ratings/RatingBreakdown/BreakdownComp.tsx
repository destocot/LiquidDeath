import React, { useState } from 'react';
import { RatingBreakdownProps } from '../types';
import helpers from '../../../helpPlease';
const sumHelper = helpers.sumHelper;

const BreakdownComp: React.FC<RatingBreakdownProps> = ({ filters, updateFilters, reviewsMeta }) => {
  const filterByRatings = (key: string) => {
    let keyNum = Number(key);
    let prevFilters = filters.ratings;
    let indexOfKey = prevFilters.indexOf(keyNum);

    // this either adds or removes a filter based on current filters
    if (indexOfKey === -1) {
      prevFilters.push(keyNum);
    } else {
      prevFilters.splice(indexOfKey, 1);
    }
    updateFilters({ ratings: prevFilters });
  };

  // this function generates the average breakdown bars
  type Result = {
    [key: string]: number
  }
  const generateObj = () => {
    const result: Result = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };
    // update result object w/ actual values
    for (var key in reviewsMeta.ratings) {
      result[key] = Number(reviewsMeta.ratings[key]);
    };

    // calculate sum of ratings to use later
    let sum = sumHelper(Object.values(result));

    // map jsx and calculate percentage for each review
    return Object.keys(result).map((key) => (
      <div key={key} className="breakdownRating" onClick={() => filterByRatings(key)}>
        <div id="breakdownLabel" >{key} stars</div>
        <progress id="breakdownBar" max="1" value={result[key] / sum}>a bar</progress>
        <div className="mx-auto px-[1px]">{result[key]}</div>
      </div>
    ));
  };

  // clears all filters
  const resetFilters = () => {
    updateFilters({ ratings: [] });
  };

  // renders a list of applied filters
  const filtersApplied = () => {
    const ratingsDivs = filters.ratings.map((filter) => <div key={filter} >{filter + ' stars'}</div>);
    return (
      <div>
        Filters Applied:
        <div>{ratingsDivs}</div>
        <button onClick={resetFilters} type="button">Reset Filters</button>
      </div>
    );
  };

  // render jsx
  return (
    <div className="actualBreakdown">
      {generateObj()}
      {filters.ratings.length > 0 ? filtersApplied() : null}
    </div>
  );
}

export default BreakdownComp;
