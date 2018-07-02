import * as actionTypes from '../constants/actionTypes';

const initialState = {
  lists: []
};

const holiday = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HOLIDAY_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.HOLIDAY_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.payload.holiday
      };
    case actionTypes.HOLIDAY_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default holiday;
