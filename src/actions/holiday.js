import * as actionTypes from '../constants/actionTypes';

export const createHolidayRequest = (form, resolve, reject) => ({
  type: actionTypes.HOLIDAY_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createHolidaySuccess = holiday => ({
  type: actionTypes.HOLIDAY_CREATE_SUCCESS,
  payload: {
    holiday
  }
});

export const createHolidayFailure = message => ({
  type: actionTypes.HOLIDAY_CREATE_FAILURE,
  payload: {
    message
  }
});

export const fetchHolidayRequest = (year, month = null) => ({
  type: actionTypes.HOLIDAY_FETCH_REQUEST,
  payload: {
    year,
    month
  }
});

export const fetchHolidaySuccess = holidays => ({
  type: actionTypes.HOLIDAY_FETCH_SUCCESS,
  payload: {
    holidays
  }
});

export const fetchHolidayFailure = message => ({
  type: actionTypes.HOLIDAY_FETCH_FAILURE,
  payload: {
    message
  }
});

export const deleteHolidayRequest = (id, year) => ({
  type: actionTypes.HOLIDAY_DELETE_REQUEST,
  payload: {
    id,
    year
  }
});

export const deleteHolidaySuccess = () => ({
  type: actionTypes.HOLIDAY_DELETE_SUCCESS
});

export const deleteHolidayFailure = message => ({
  type: actionTypes.HOLIDAY_DELETE_FAILURE,
  payload: {
    message
  }
});
