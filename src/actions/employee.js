import * as actionTypes from '../constants/actionTypes';

export const createEmployeeRequest = (form, resolve, reject) => ({
  type: actionTypes.EMPLOYEE_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createEmployeeSuccess = employees => ({
  type: actionTypes.EMPLOYEE_CREATE_SUCCESS,
  payload: {
    employees
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

export const filterEmployee = text => ({
  type: actionTypes.FILTER_EMPLOYEE,
  payload: {
    text
  }
});

export const filterDepartment = departmentId => ({
  type: actionTypes.FILTER_DEPARTMENT,
  payload: {
    departmentId
  }
});
