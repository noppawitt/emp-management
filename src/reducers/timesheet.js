import * as actionTypes from '../constants/actionTypes';

const initialState = {};

const timesheet = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TIMESHEET_FETCH_REQUEST:
      return {
        isFetching: true
      };
    case actionTypes.TIMESHHET_FETCH_SUCCESS:
      return {
        isFetching: false,
        lists: action.payload.timesheets
      };
    default:
      return state;
  }
};

export default timesheet;
