import React, { useState } from 'react';
import { sortHelpfulness, sortNewest, sortRelevance } from './helpers';
console.log(sortHelpfulness);
function Sorting({ sortedFilteredReviews, updateSetSortedFilteredReviews }) {
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
      <label for="sortFilter">Sort Options:</label>
      <select name="sortFilter" onChange={handleClick}>
        <option value="relevant">Relevant</option>
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}

export default Sorting;
