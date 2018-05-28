import * as actionTypes from '../constants/actionTypes';

export const fetchLeaveRequest = () => ({
  type: actionTypes.LEAVE_FETCH_REQUEST
});

export const fetchLeaveSuccess = leaves => ({
  type: actionTypes.LEAVE_FETCH_SUCCESS,
  payload: {
    leaves
  }
});

export const fetchLeaveFailure = message => ({
  type: actionTypes.LEAVE_FETCH_SUCCESS,
  payload: {
    message
  }
});
