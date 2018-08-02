import * as actionTypes from '../constants/actionTypes';

export const fetchProjectRequest = userId => ({
  type: actionTypes.PROJECT_FETCH_REQUEST,
  payload: {
    userId
  }
});

export const fetchProjectSuccess = projects => ({
  type: actionTypes.PROJECT_FETCH_SUCCESS,
  payload: {
    projects
  }
});

export const fetchProjectFailure = message => ({
  type: actionTypes.PROJECT_FETCH_FAILURE,
  payload: {
    message
  }
});

export const createProjectRequest = (form, resolve, reject) => ({
  type: actionTypes.PROJECT_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createProjectSuccess = projects => ({
  type: actionTypes.PROJECT_CREATE_SUCCESS,
  payload: {
    projects
  }
});

export const createProjectFailure = message => ({
  type: actionTypes.PROJECT_CREATE_FAILURE,
  payload: {
    message
  }
});

export const filterProject = text => ({
  type: actionTypes.FILTER_PROJECT,
  payload: {
    searchText: text
  }
});

export const sortProject = (sortKey, direction) => ({
  type: actionTypes.SORT_PROJECT,
  payload: {
    sortKey,
    direction
  }
});

export const changeProjectPage = page => ({
  type: actionTypes.CHANGE_PROJECT_PAGE,
  payload: {
    page
  }
});

export const changeHasPoNumber = value => ({
  type: actionTypes.CHANGE_HAS_PO_NUMBER,
  payload: {
    value
  }
});
