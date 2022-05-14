import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLocation } from '../actions';
import { getVenuesDetails } from '../actions';
import { resetVenues } from '../actions';

class SearchLocation extends Component {


  // set Map and venues rely upon area data
  setMapVenues = (area) =>{
    this.props.resetVenues();//reset previous data
    this.props.getLocation(area);//set up map
    this.props.getVenuesDetails(this.props.location.lat()+','+this.props.location.lng());//get list of venues
  }

  renderAutocomplete = () => {

    console.log('in renderAutocomplete, condition:',(Object.entries(this.props.googleObject).length === 0 && this.props.googleObject.constructor === Object));
    if(!(Object.entries(this.props.googleObject).length === 0 && this.props.googleObject.constructor === Object)){
      let googleObject = this.props.googleObject;
      console.log('in renderAutocomplete, in IF statement, googleObject:',googleObject);
      let input = document.getElementById('searchInput');
      var autoComplete = new googleObject.maps.places.Autocomplete(input);

      //first moment of start - set up default area
      if (!this.props.areaObject.location){
        var geocoder = new googleObject.maps.Geocoder();
        geocoder.geocode( { location:{lat:40.7830603,lng:-73.971248}}, (results, status) => {
        if (status == googleObject.maps.GeocoderStatus.OK){
            var defaultArea = {
              name: 'Manhattan',
              location: results[0].geometry.location
            }
          }

          // set up map and venues
          this.setMapVenues(defaultArea);
        })
      }
      //User search location
      autoComplete.addListener('place_changed',() => {
        var place = autoComplete.getPlace()
        if (place.geometry){
          console.log('in autoComplete - Place:',place.name);
          let area = {
            name:place.name,
            location:place.geometry.location
          }

          // set up map and venues
          this.setMapVenues(area)
        }
        else {
          console.log('no such place!!!');
        }
      })
    }
  }

  render(){
    console.log('in SearchLocation, in render');
    this.renderAutocomplete();
    let currentArea =  this.props.areaObject.name == 'Manhattan' ? 'Manhattan' : '';
    return(
      <div className = 'SearchLocation'>
        <span className = 'SearchLocation-currentLocation'>Search in:</span>
        <span className = 'SearchLocation-inputContainer'>  <input id='searchInput' placeholder='Type name of any area, address, or zip code or some other places...' size="50"/></span>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return { googleObject:state.googleObject,
           areaObject:state.areaObject,
           location:state.areaObject.location}
}

export default connect(mapStateToProps,{ getLocation, getVenuesDetails, resetVenues })(SearchLocation);
