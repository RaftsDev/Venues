export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DETAILS':
      console.log('inside case in venueDetails reducer, payload',action.payload);
      let payload = [...state, action.payload];
      console.log('payload:',payload);
      return payload;
    case 'RESET':
      console.log('Reset');
      return state = [];
    default:
      return state;
  }
}
