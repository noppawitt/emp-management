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

export const pageChange = value => ({
  type: actionTypes.TAKE_EXAM_PAGINATION_CHANGE,
  payload: {
    value,
  }
});

export const onPickRadioAnswer = (choice, currentActivePage, pickedAnswer, exId) => ({
  type: actionTypes.TAKE_EXAM_ON_PICK_RADIO,
  payload: {
    choice,
    currentActivePage,
    pickedAnswer,
    exId,
  },
});

export const onPickCheckboxAnswer = (choice, currentActivePage, pickedAnswer, exId) => ({
  type: actionTypes.TAKE_EXAM_ON_PICK_CHECKBOX,
  payload: {
    choice,
    currentActivePage,
    pickedAnswer,
    exId,
  },
});

export const onInputTextAreaAnswer = (text, currentActivePage, pickedAnswer, exId) => ({
  type: actionTypes.TAKE_EXAM_ON_INPUT_TEXTAREA,
  payload: {
    text,
    currentActivePage,
    pickedAnswer,
    exId,
  },
});

export const uploadAnswerListRequest = (id, category, answerList) => ({
  type: actionTypes.TAKE_EXAM_UPLOAD_REQUEST,
  payload: {
    id,
    category,
    answerList,
  }
});

export const uploadAnswerListSuccess = progress => ({
  type: actionTypes.TAKE_EXAM_UPLOAD_SUCCESS,
  payload: {
    progress
  }
});

export const uploadAnswerListFailure = messege => ({
  type: actionTypes.TAKE_EXAM_UPLOAD_FAILURE,
  payload: {
    messege,
  }
});
