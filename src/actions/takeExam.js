import * as actionTypes from '../constants/actionTypes';

export const fetchTakeExamRequest = id => ({
  type: actionTypes.TAKE_EXAM_FETCH_REQUEST,
  payload: {
    id,
  }
});

export const fetchTakeExamSuccess = examList => ({
  type: actionTypes.TAKE_EXAM_FETCH_SUCCESS,
  payload: {
    examList,
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
