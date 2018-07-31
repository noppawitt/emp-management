import * as actionTypes from '../constants/actionTypes';

export const fetchProfileRequest = userId => ({
  type: actionTypes.PROFILE_FETCH_REQUEST,
  payload: {
    userId
  }
});

export const fetchProfileSuccess = profile => ({
  type: actionTypes.PROFILE_FETCH_SUCCESS,
  payload: {
    profile
  }
});

export const fetchProfileFailure = message => ({
  type: actionTypes.PROFILE_FETCH_FAILURE,
  payload: {
    message
  }
});

export const updateProfileRequest = (form, resolve, reject, type) => ({
  type: actionTypes.PROFILE_UPDATE_REQUEST,
  payload: {
    form,
    resolve,
    reject,
    type
  }
});

export const updateProfileSuccess = profile => ({
  type: actionTypes.PROFILE_UPDATE_SUCCESS,
  payload: {
    profile
  }
});

export const updateProfileFailure = message => ({
  type: actionTypes.PROFILE_UPDATE_FAILURE,
  payload: {
    message
  }
});

export const deleteProfileRequest = (profileType, profileId) => ({
  type: actionTypes.PROFILE_DELETE_REQUEST,
  payload: {
    profileType,
    profileId
  }
});

export const deleteProfileSuccess = (profileType, profile) => ({
  type: actionTypes.PROFILE_DELETE_SUCCESS,
  payload: {
    profileType,
    profile
  }
});

export const deleteProfileFailure = message => ({
  type: actionTypes.PROFILE_DELETE_FAILURE,
  payload: {
    message
  }
});

export const updateProfilePictureRequest = (picture, userId) => ({
  type: actionTypes.PROFILE_PICTURE_UPDATE_REQUEST,
  payload: {
    picture,
    userId
  }
});

export const updateProfilePictureSuccess = pictureURL => ({
  type: actionTypes.PROFILE_PICTURE_UPDATE_SUCCESS,
  payload: {
    pictureURL
  }
});

export const updateProfilePictureFailure = message => ({
  type: actionTypes.PROFILE_PICTURE_UPDATE_FAILURE,
  payload: {
    message
  }
});
