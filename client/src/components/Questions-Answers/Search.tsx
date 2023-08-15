import React from 'react';
import './qa-styles/Search.styles.css'

function Search({ setQuery }) {
  const setSearch = (event: any) => {
    setQuery(event.target.value)
  };

  return (
    <div className="search-container">
      <input onChange={(e) => setSearch(e)} type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS?" />
      <i className="fa-solid fa-magnifying-glass" />
    </div>
  );
}

export default Search;
