import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  render() {

    const { onFilterClicked, activeFilter } = this.props;

    return (
      <div className="btn-group">
        <button type="button"
                className={ `btn ${ activeFilter === 0 ? 'btn-info' : 'btn-outline-secondary' }` }
                onClick={ () => onFilterClicked(0) }>All</button>
        <button type="button"
                className={ `btn ${ activeFilter === 1 ? 'btn-info' : 'btn-outline-secondary' }` }
                onClick={ () => onFilterClicked(1) }>Active</button>
        <button type="button"
                className={ `btn ${ activeFilter === 2 ? 'btn-info' : 'btn-outline-secondary' }` }
                onClick={ () => onFilterClicked(2) }>Done</button>
      </div>
    );
  }
} 
