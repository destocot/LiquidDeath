import React, { useState } from 'react';
import helpers from '../../../helpPlease';

function BreakdownComp({filters, updateFilters, reviewsMeta}) {
  // data comes from reviewsMeta
  const sumHelper = helpers.sumHelper;

  const filterByRatings = (key) => {
    key = Number(key);
    let prevFilters = filters.ratings;
    let indexOfKey = prevFilters.indexOf(key);

    // this either adds or removes a filter based on current filters
    if (indexOfKey === -1) {
      prevFilters.push(key);
    } else {
      prevFilters.splice(indexOfKey, 1);
    }
    updateFilters({ ratings: prevFilters });
  };

  // this function generates the average breakdown bars
  const generateObj = () => {
    const result = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
    // update result object w/ actual values
    for (var key in reviewsMeta.ratings) {
      result[key] = Number(reviewsMeta.ratings[key]);
    };

    // calculate sum of ratings to use later
    let sum = sumHelper(Object.values(result));

    // map jsx and calculate percentage for each review
    return Object.keys(result).map((key) => (
      <div key={key} className="breakdownRating">
        <div id="breakdownLabel" onClick={() => filterByRatings(key)}>{key} stars</div>
        <progress id="breakdownBar" max="1" value={result[key] / sum}>a bar</progress>
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