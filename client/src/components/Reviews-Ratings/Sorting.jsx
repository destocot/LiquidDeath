import React, { useState } from 'react';

function Sorting() {
  return (
    <div>
      <label for="sortFilter">Sort Options:</label>
      <select name="sortFilter">
        <option value="relevant">Relevant</option>
        <option value="helpful">Helpful</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}

export default Sorting;
