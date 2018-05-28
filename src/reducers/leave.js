import * as actionTypes from '../constants/actionTypes';

const initialState = {
  lists: []
};

const leave = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LEAVE_FETCH_REQUEST:
      return {
        isFetching: true
      };
    case actionTypes.LEAVE_FETCH_SUCCESS:
      return {
        isFetching: false,
        lists: actionTypes.payload.leaves
      };
    case actionTypes.LEAVE_FETCH_FAILURE:
      return {
        isFetching: false,
        message: actionTypes.payload.message
      };
    default:
      return state;
  }
};

export default leave;
