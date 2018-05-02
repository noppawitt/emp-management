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

export const updateProfileRequest = (id, type, form) => ({
  type: actionTypes.PROFILE_UPDATE_REQUEST,
  payload: {
    id,
    type,
    form
  }
});

export const updateProfileSuccess = profile => ({
  type: actionTypes.PROFILE_UPDATE_SUCCESS,
  payload: {
    profile
  }
});
