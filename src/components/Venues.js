import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVenues } from '../actions';
import { getDetails } from '../actions';
import { getVenuesDetails } from '../actions';
import { getFocus } from '../actions';

class Venues extends Component {

  //Function for checking intrcept focus
  updateFocus = (e,dataId) => {
    console.log('Click on e:',e,' click venue id:',dataId);
    this.props.getFocus(dataId);
  }

  // Render list of venues
  renderVenues() {
    console.log('in renderVenues');
    if(this.props.venuesDetails.length) {
      //console.log('lat:',this.props.location.lat(),' lng:',this.props.location.lng());
      //console.log('in <Venues/> props:',this.props);
      // this.props.venuesDetails.map((venue)=>(console.log('time:',venue.data.response.venue))));
      // if (this.props.venuesDetails[0].data.response.venue.hours){
      //   console.log('time:',this.props.venuesDetails[0].data.response.venue.hours.timeframes[0]);
      // }
      return this.props.venuesDetails.map((venue)=>(this.renderCard(venue.data.response.venue)));
    }
    else {
      return <div>Loading...</div>
    }
  }


  // Render single card of venue
  renderCard(venue){
    return(
      <div className='Venues-card' id = { this.props.focus==venue.id ? 'focused':null} key={venue.id} onClick={((e)=>(this.updateFocus(e, venue.id)))}>
        <div className = 'Venues-card-head'>
          <span className = 'Venues-card-head-name'>
          {venue.name}
          </span>
          <span className = 'Venues-card-head-rate'>
            {venue.rating?`${venue.rating}`:'No rate'}
          </span>
        </div>
        <hr/>
        <div className = 'Venues-card-details'>
          <span className = 'Venues-card-details-pic'>
            <img src={venue.photos.groups[1]?venue.photos.groups[1].items[0].prefix+'75x75'+venue.photos.groups[1].items[0].suffix: require('../images/NoPic-75.png')}/>
          {/*<img src={require('../images/NoPic.png')}/>*/}
          </span>
          <span className = 'Venues-card-details-menu'>
            <img src={require('../images/menu-75.jpg')}/>
          </span>
          <span className = 'Venues-card-details-time'>
            <span>{ venue.hours?`Days:${venue.hours.timeframes[0].days}`:'No available'}</span><br/>
            <span>{ venue.hours?`Hours:${venue.hours.timeframes[0].open[0].renderedTime}`:''}</span>
          </span>
          <span className = 'Venues-card-details-address'>
          {venue.location.address}
          </span>
        </div>
      </div>
    )

  }


  render(){


    return (
      <div className="Venues">
        {this.renderVenues()}
      </div>
    );
  }
};
const mapStateToProps = state => {
  return { location:state.areaObject.location,
           venuesDetails:state.venuesDetails,
           focus:state.focus };
}
export default connect (mapStateToProps,{ getVenues, getDetails, getVenuesDetails, getFocus })(Venues);
