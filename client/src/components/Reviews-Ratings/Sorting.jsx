import React, { useState } from 'react';

function Sorting({ sortedFilteredReviews, updateSetSortedFilteredReviews }) {
  const handleClick = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const tempArray = sortedFilteredReviews;

    tempArray.sort((a, b) => {
      const revA = a.helpfulness;
      const revB = b.helpfulness;
      if (revA < revB) {
        return 1;
      }
      if (revA > revB) {
        return -1;
      }
      return 0;
    });
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
