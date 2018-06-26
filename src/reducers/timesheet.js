import * as actionTypes from '../constants/actionTypes';

const initialState = {};

const timesheet = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TIMESHEET_CREATE_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    case actionTypes.TIMESHEET_CREATE_SUCCESS:
      return {
        ...state,
        lists: [...state.lists, action.payload.timesheet].sort((a, b) => a.date < b.date)
      };
    case actionTypes.TIMESHEET_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
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
