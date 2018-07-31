import moment from 'moment';
import * as actionTypes from '../constants/actionTypes';

const now = moment();

const initialState = {
  year: now.format('YYYY'),
  month: now.format('MM'),
  projects: [],
  projectDetail: null
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
    case actionTypes.PROJECT_MEMBER_FETCH_REQUEST:
      return {
        ...state,
        projectId: action.payload.projectId
      };
    case actionTypes.PROJECT_MEMBER_FETCH_SUCCESS:
      return {
        ...state,
        projectDetail: action.payload.projectDetail
      };
    case actionTypes.PROJECT_MEMBER_FETCH_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default report;
