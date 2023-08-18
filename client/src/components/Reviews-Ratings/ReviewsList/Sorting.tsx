import React, { useState } from 'react';
// import helpers from '../../../helpPlease';
// const sortHelpfulness = helpers.sortHelpfulness;
// const sortNewest = helpers.sortNewest;
// const sortRelevance = helpers.sortRelevance;

function Sorting({ updReviews }) {
  const handleClick = (event) => {
    event.preventDefault();
    const value = event.target.value;
    updReviews(value, 9999, 1);
  };

  return (
    <div className="text-lg pb-3">
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
