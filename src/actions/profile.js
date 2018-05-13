import * as actionTypes from '../constants/actionTypes';

export const fetchProfileRequest = id => ({
  type: actionTypes.PROFILE_FETCH_REQUEST,
  payload: {
    id
  }
});

export const fetchProfileSuccess = profile => ({
  type: actionTypes.PROFILE_FETCH_SUCCESS,
  payload: {
    profile
  }
});

export const updateProfileRequest = (type, form, resolve, reject) => ({
  type: actionTypes.PROFILE_UPDATE_REQUEST,
  payload: {
    type,
    form,
    resolve,
    reject
  }
});

export const updateProfileSuccess = profile => ({
  type: actionTypes.PROFILE_UPDATE_SUCCESS,
  payload: {
    profile
  }
});
