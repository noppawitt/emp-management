import * as actionTypes from '../constants/actionTypes';

export const createHolidayRequest = (form, resolve, reject) => ({
  payload: {
    type: actionTypes.HOLIDAY_CREATE_REQUEST,
    form,
    resolve,
    reject
  }
});

export const createHolidaySuccess = holiday => ({
  payload: {
    type: actionTypes.HOLIDAY_CREATE_SUCCESS,
    holiday
  }
});

export const createHolidayFailure = message => ({
  payload: {
    type: actionTypes.HOLIDAY_CREATE_FAILURE,
    message
  }
});

export const fetchHolidayRequest = (year, month) => ({
  payload: {
    type: actionTypes.HOLIDAY_FETCH_REQUEST,
    year,
    month
  }
});

export const fetchHolidaySuccess = holidays => ({
  payload: {
    type: actionTypes.HOLIDAY_FETCH_SUCCESS,
    holidays
  }
});

export const fetchHolidayFailure = message => ({
  payload: {
    type: actionTypes.HOLIDAY_FETCH_FAILURE,
    message
  }
});

export const deleteHolidayRequest = holidayId => ({
  payload: {
    type: actionTypes.HOLIDAY_DELETE_REQUEST,
    holidayId
  }
});

export const deleteHolidaySuccess = () => ({
  payload: {
    type: actionTypes.HOLIDAY_DELETE_SUCCESS,
  }
});

export const deleteHolidayFailure = message => ({
  payload: {
    type: actionTypes.HOLIDAY_DELETE_FAILURE,
    message
  }
});
