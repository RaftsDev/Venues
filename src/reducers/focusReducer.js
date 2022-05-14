export default (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_FOCUS':
      console.log('inside case in focus reducer, payload',action.payload);
      return action.payload;
    default:
      return state;
  }
}
