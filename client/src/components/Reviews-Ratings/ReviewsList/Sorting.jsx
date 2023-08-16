import React, { useState } from 'react';
import helpers from '../../../helpPlease';
const sortHelpfulness = helpers.sortHelpfulness;
const sortNewest = helpers.sortNewest;
const sortRelevance = helpers.sortRelevance;

function Sorting({ sortedFilteredReviews, updateSetSortedFilteredReviews }) {
  // this is a single function that sorts the array in three different ways depending on what user selects in the dropdown. It references functions in helpers.js file
  const handleClick = (event) => {
    event.preventDefault();
    const tempArray = sortedFilteredReviews.slice(0);

    const functionObjects = {
      'helpful': sortHelpfulness,
      'newest': sortNewest,
      'relevant': sortRelevance,
    }

    const value = event.target.value;
    const sortMethod = functionObjects[value];

    tempArray.sort(sortMethod);
    updateSetSortedFilteredReviews(tempArray);
  };

  return (
    <div>
      <label htmlFor="sortFilter">Sort Options:</label>
      <select name="sortFilter" onChange={handleClick}>
        <option value="relevant">Relevant</option>
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}

export default Sorting;
