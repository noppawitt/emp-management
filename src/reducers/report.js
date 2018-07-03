import moment from 'moment';
import * as actionTypes from '../constants/actionTypes';

const now = moment();

const initialState = {
  year: now.year(),
  month: now.month() + 1,
  projects: []
};

const report = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OWN_PROJECT_FETCH_REQUEST:
      return {
        ...state,
        year: action.payload.year,
        month: action.payload.month
      };
    case actionTypes.OWN_PROJECT_FETCH_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects
      };
    case actionTypes.OWN_PROJECT_FETCH_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default report;
