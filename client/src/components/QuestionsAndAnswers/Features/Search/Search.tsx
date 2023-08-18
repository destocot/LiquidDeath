import React, { Dispatch, SetStateAction } from 'react';

interface SearchProps {
  setQuery: Dispatch<SetStateAction<string>>;
}

function Search({ setQuery }: SearchProps) {
  const setSearch = (event: any) => {
    if (event.target.value.length > 2) {
      setQuery(event.target.value)
    } else {
      setQuery('');
    }
  };

  return (
    <div className="search-container">
      <input className="border-none flex-grow focus:outline-none focus:border-b-[black] focus:border-b focus:border-solid text-[black]"
        onChange={(e) => setSearch(e)}
        type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS?" />
      <i className="fa-solid fa-magnifying-glass p-[0.313rem] text-xl " style={{ color: 'black' }} />
    </div>
  );
}

export default Search;