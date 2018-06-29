import * as actionTypes from '../constants/actionTypes';

export const fetcTakeExamRequest = () => ({
  type: actionTypes.TAKE_EXAM_FECTH_REQUEST,
  payload: {}
});

export const fetcTakeExamSuccess = (position, eprList, exam) => ({
  type: actionTypes.TAKE_EXAM_FECTH_REQUEST,
  payload: {
    position,
    eprList,
    exam,
  }
});

export const fetcTakeExamFailure = messege => ({
  type: actionTypes.TAKE_EXAM_FECTH_REQUEST,
  payload: {
    messege,
  }
});

export const changeActiveItem = item => ({
  type: actionTypes.TAKE_EXAM_CHANGE_ACTIVE_ITEM,
  payload: {
    item,
  }
});
