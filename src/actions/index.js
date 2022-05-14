import { getGoogleObject } from '../api/GoogleConnection';
import FourSquareConnection from '../api/FourSquareConnection';
import {FourSquareClient_id} from '../api/keys';
import {FourSquareClient_secret} from '../api/keys';


export const getGoogle = () => async dispatch => {
  console.log('inside getGoogle action, async function');
  const response = await getGoogleObject();
  console.log('inside action, response:',response);
  dispatch({type: 'GOOGLE_OBJECT', payload: response});
};

export const getLocation = (area) => {
  console.log('inside getLocation action',area);
  return { type:'AREA_OBJECT', payload: area };
};

export const getVenuesDetails = (location) => async (dispatch,getState) => {
  console.log('in getVenueDetails');
  await dispatch(getVenues(location));

  getState().venuesReducer.data.response.venues.map((el)=>(el.id)).forEach(async function(id){ await dispatch(getDetails(id))})
}

export const getVenues = (location) => async dispatch => {
  console.log('in getVenues:');
  const parameters = {
    client_id:FourSquareClient_id,
    client_secret:FourSquareClient_secret,
    ll:location,
    query:'restaurant,pizza',
    radius:5000,
    limit:10,
    v:'20182507'
  }

  const response = await FourSquareConnection.get('/search?' + new URLSearchParams(parameters))

  dispatch({ type: 'FETCH_VENUES', payload: response});
};

export const getDetails = (Id) => async dispatch => {
  console.log('in getDetails params:');
  // const Id='4aad3536f964a520035f20e3'
  const parameters = {
    client_id:FourSquareClient_id,
    client_secret:FourSquareClient_secret,
    v:'20182507'
  }
  const response = await FourSquareConnection.get('/'+Id+'?' + new URLSearchParams(parameters))

  dispatch({ type: 'FETCH_DETAILS', payload: response});
};

//for reset reducer that has data of venues from previous area
export const resetVenues = () => {

  return ({ type: 'RESET' })
}

//for update information about venue that got focus
export const getFocus = (dataId) => {

  return ({type:'UPDATE_FOCUS', payload:dataId})
}
