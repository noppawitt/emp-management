import * as actionTypes from '../constants/actionTypes';

const accessControl = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ACCESS_CONTROL_FETCH_REQUEST:
      return {
        ...state
      };
    case actionTypes.ACCESS_CONTROL_FETCH_SUCCESS:
      return {
        ...action.payload.accessControl
      };
    case actionTypes.ACCESS_CONTROL_FETCH_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default accessControl;
