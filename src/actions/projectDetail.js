import * as actionTypes from '../constants/actionTypes';

export const fetchProjectDetailRequest = projectId => ({
  type: actionTypes.PROJECT_DETAIL_FETCH_REQUEST,
  payload: {
    projectId
  }
});

export const fetchProjectDetailSuccess = projectDetail => ({
  type: actionTypes.PROJECT_DETAIL_FETCH_SUCCESS,
  payload: {
    projectDetail
  }
});

export const fetchProjectDetailFailure = message => ({
  type: actionTypes.PROJECT_DETAIL_FETCH_FAILURE,
  payload: {
    message
  }
});

export const updateProjectDetailRequest = (form, resolve, reject) => ({
  type: actionTypes.PROJECT_DETAIL_UPDATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const updateProjectDetailSuccess = projectDetail => ({
  type: actionTypes.PROJECT_DETAIL_UPDATE_SUCCESS,
  payload: {
    projectDetail
  }
});

export const updateProjectDetailFailure = message => ({
  type: actionTypes.PROJECT_DETAIL_UPDATE_FAILURE,
  payload: {
    message
  }
});

export const createMemberRequest = (form, resolve, reject) => ({
  type: actionTypes.MEMBER_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createMemberSuccess = members => ({
  type: actionTypes.MEMBER_CREATE_SUCCESS,
  payload: {
    members
  }
});

export const createMemberFailure = message => ({
  type: actionTypes.MEMBER_CREATE_FAILURE,
  payload: {
    message
  }
});

export const deleteMemberRequest = (userId, projectId) => ({
  type: actionTypes.MEMBER_DELETE_REQUEST,
  payload: {
    userId,
    projectId
  }
});

export const deleteMemberSuccess = members => ({
  type: actionTypes.MEMBER_DELETE_SUCCESS,
  payload: {
    members
  }
});

export const deleteMemberFailure = message => ({
  type: actionTypes.MEMBER_DELETE_FAILURE,
  payload: {
    message
  }
});

export const downloadFileRequest = (fileId, fileName) => ({
  type: actionTypes.FILE_DOWNLOAD_REQUEST,
  payload: {
    fileId,
    fileName
  }
});

export const downloadFileSuccess = () => ({
  type: actionTypes.FILE_DOWNLOAD_SUCCESS
});

export const downloadFileFailure = message => ({
  type: actionTypes.FILE_DOWNLOAD_FAILURE,
  payload: {
    message
  }
});

export const uploadFileRequest = (file, projectId) => ({
  type: actionTypes.FILE_UPLOAD_REQUEST,
  payload: {
    file,
    projectId
  }
});

export const uploadFileSuccess = files => ({
  type: actionTypes.FILE_UPLOAD_SUCCESS,
  payload: {
    files
  }
});

export const uploadFileFailure = message => ({
  type: actionTypes.FILE_UPLOAD_FAILURE,
  payload: {
    message
  }
});
