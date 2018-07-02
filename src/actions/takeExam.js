import * as actionTypes from '../constants/actionTypes';

export const fetchTakeExamRequest = id => ({
  type: actionTypes.TAKE_EXAM_FETCH_REQUEST,
  payload: {
    id,
  }
});

export const fetchTakeExamSuccess = examObject => ({
  type: actionTypes.TAKE_EXAM_FETCH_SUCCESS,
  payload: {
    examObject,
  }
});

export const fetchTakeExamFailure = messege => ({
  type: actionTypes.TAKE_EXAM_FETCH_FAILURE,
  payload: {
    messege,
  }
});

export const changeActiveItem = activeItem => ({
  type: actionTypes.TAKE_EXAM_CHANGE_ACTIVE_ITEM,
  payload: {
    activeItem,
  }
});
