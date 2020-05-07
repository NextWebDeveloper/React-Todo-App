import React from 'react';

import './search-panel.css';

const SearchPanel = (props) => {
  return (
    <input type="text"
              className="form-control search-input"
              placeholder="type to search" 
              onChange={ props.onSearchChanged }/>
  );
};

export default SearchPanel;