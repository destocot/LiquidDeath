import React, { useState } from 'react';

function Sorting({ updReviews }) {
  const handleClick = (event) => {
    event.preventDefault();
    const value = event.target.value;
    updReviews(value, 9999, 1);
  };

  return (
    <div className="text-lg">
      <label htmlFor="sortFilter">sorted by:{' '}</label>
      <select className="bg-inherit" name="sortFilter" onChange={handleClick}>
        <option value="relevant">relevance</option>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
      </select>
    </div>
  );
}

export default Sorting;
