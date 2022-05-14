import React, { Component } from 'react';
import '../App.css';
import SearchLocation from './SearchLocation';
import List from './List';
import Map from './Map';

import { connect } from 'react-redux';
import { getGoogle } from '../actions';

class App extends Component {

  componentDidMount(){
    this.props.getGoogle();
  }

  render(){
    return (
      <div className="App">
        <div className='App-title-box'>
          High rated venues in your area
        </div>
        <div className='App-search-location-box'>
          <SearchLocation/>
        </div>
        <div className='App-venues-box'>
          <List/>
        </div>
        <div className='App-map-box'>
          <Map/>
        </div>
      </div>);
  }
};

export default connect(null,{ getGoogle })(App);
