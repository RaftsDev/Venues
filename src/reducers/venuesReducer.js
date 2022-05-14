export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_VENUES':
      console.log('inside case in venues reducer, payload',action.payload);
      return action.payload;
    default:
      return state;
  }
}
