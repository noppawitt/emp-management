import * as actionTypes from '../constants/actionTypes';

export const fetchEmployeeRequest = () => ({
  type: actionTypes.EMPLOYEE_FETCH_REQUEST
});

export const fetchEmployeeSuccess = employees => ({
  type: actionTypes.EMPLOYEE_FETCH_SUCCESS,
  payload: {
    employees
  }
});

export const fetchEmployeeFailure = message => ({
  type: actionTypes.EMPLOYEE_FETCH_FAILURE,
  payload: {
    message
  }
});
