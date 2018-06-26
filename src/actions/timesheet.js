import * as actionTypes from '../constants/actionTypes';

export const createTimesheetRequest = (form, resolve, reject) => ({
  type: actionTypes.TIMESHEET_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createTimesheetSuccess = timesheet => ({
  type: actionTypes.TIMESHEET_CREATE_SUCCESS,
  payload: {
    timesheet
  }
});

export const createTimesheetFailure = message => ({
  type: actionTypes.TIMESHEET_CREATE_FAILURE,
  payload: {
    message
  }
});

export const fetchTimesheetRequest = id => ({
  type: actionTypes.TIMESHEET_FETCH_REQUEST,
  payload: {
    id
  }
});

export const fetchTimesheetSuccess = timesheets => ({
  type: actionTypes.TIMESHHET_FETCH_SUCCESS,
  payload: {
    timesheets
  }
});

export const fetchTimesheetFailure = message => ({
  type: actionTypes.TIMESHHET_FETCH_FAILURE,
  payload: {
    message
  }
});

export const updateTimesheetRequest = (form, resolve, reject) => ({
  type: actionTypes.TIMESHEET_UPDATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const updateTimesheetSuccess = timesheets => ({
  type: actionTypes.TIMESHEET_UPDATE_SUCCESS,
  payload: {
    timesheets
  }
});

export const updateTimesheetFailure = message => ({
  type: actionTypes.TIMESHEET_UPDATE_FAILURE,
  payload: {
    message
  }
});

export const deleteTimesheetRequest = timesheetId => ({
  type: actionTypes.TIMESHEET_DELETE_REQUEST,
  payload: {
    timesheetId
  }
});

export const deleteTimesheetSuccess = timesheetId => ({
  type: actionTypes.TIMESHEET_DELETE_SUCCESS,
  payload: {
    timesheetId
  }
});

export const deleteTimesheetFailure = message => ({
  type: actionTypes.TIMESHEET_DELETE_FAILURE,
  payload: {
    message
  }
});
