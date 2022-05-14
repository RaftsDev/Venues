import React, { Component } from 'react';
import VenuesSearch from './VenuesSearch';
import Venues from './Venues';

class List extends Component {

  render(){
    return (
      <div className="List">
        <VenuesSearch/>
        <Venues/>
      </div>
    );
  }
};

export default List;
