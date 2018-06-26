import * as actionTypes from '../constants/actionTypes';

export const fetchExamResultRequest = cid => ({
  type: actionTypes.VIEW_RESULT_FETCH_REQUEST,
  payload: {
    citizen_id: cid,
  }
});

export const fetchExamResultSuccess = results => ({
  type: actionTypes.VIEW_RESULT_FETCH_SUCCESS,
  payload: {
    results,
  }
});

export const fetchExamResultFailure = messege => ({
  type: actionTypes.VIEW_RESULT_FETCH_FAILURE,
  payload: {
    messege,
  }
});

export const changeActiveItemRequest = newActiveItem => ({
  type: actionTypes.VIEW_RESULT_CHANGE_ACTIVE_ITEM,
  payload: {
    newActiveItem,
  }
});
