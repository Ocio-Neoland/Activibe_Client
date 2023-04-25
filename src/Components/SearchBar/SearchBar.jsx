import './SearchBar.css';

import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { SearchContext } from '../../Context/SearchContext';

const SearchBar = () => {
  const inputSearch = useRef();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { setSearchFinish } = useContext(SearchContext);
  const handleClickSearch = (data) => {
    sessionStorage.setItem('search', data.toLowerCase());
    const search = sessionStorage.getItem('search');
    if (pathname !== `/search?=${search}`) {
      navigate(`/search?=${search}`);
    }
    setSearchFinish(true);
  };
  return (
    <div className="search">
      <input
        type="text"
        ref={inputSearch}
        className="searchTerm"
        placeholder="¿Qué quieres hacer hoy?"
      />

      <button
        type="button"
        onClick={() => handleClickSearch(inputSearch.current.value)}
        className="searchButton"
      >
        <i className="fa fa-search" />
      </button>
    </div>
  );
};

export default SearchBar;
