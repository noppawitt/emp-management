import * as actionTypes from '../constants/actionTypes';

export const createEmployeeRequest = form => ({
  type: actionTypes.EMPLOYEE_CREATE_REQUEST,
  payload: {
    form
  }
});

export const createEmployeeSuccess = employee => ({
  type: actionTypes.EMPLOYEE_CREATE_SUCCESS,
  payload: {
    employee
  }
});

export const createEmployeeFailure = message => ({
  type: actionTypes.EMPLOYEE_CREATE_FAILURE,
  payload: {
    message
  }
});

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
