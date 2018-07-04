import * as actionTypes from '../constants/actionTypes';

export const fetchOwnProjectRequest = (userId, year, month) => ({
  type: actionTypes.OWN_PROJECT_FETCH_REQUEST,
  payload: {
    userId,
    year,
    month,
  }
});

export const fetchOwnProjectSuccess = projects => ({
  type: actionTypes.OWN_PROJECT_FETCH_SUCCESS,
  payload: {
    projects
  }
});

export const fetchOwnProjectFailure = message => ({
  type: actionTypes.OWN_PROJECT_FETCH_FAILURE,
  payload: {
    message
  }
});
