import moment from 'moment';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  lists: [],
  year: moment().format('YYYY'),
  isFetching: true
};

const holiday = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HOLIDAY_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        year: action.payload.year
      };
    case actionTypes.HOLIDAY_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.payload.holidays
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
