import * as actionTypes from '../constants/actionTypes';

export const fetchAccessControlRequest = () => ({
  type: actionTypes.ACCESS_CONTROL_FETCH_REQUEST
});

export const fetchAccessControlSuccess = accessControl => ({
  type: actionTypes.ACCESS_CONTROL_FETCH_SUCCESS,
  payload: {
    accessControl
  }
});

export const fetchAccessControlFailure = message => ({
  type: actionTypes.ACCESS_CONTROL_FETCH_FAILURE,
  payload: {
    message
  }
});
