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

export const fetchProgress = progressResult => ({
  type: actionTypes.TAKE_EXAM_FETCH_PROGRESS,
  payload: {
    progressResult,
  }
});

export const fetchCategory = categoryList => ({
  type: actionTypes.TAKE_EXAM_FETCH_CATEGORYLIST,
  payload: {
    categoryList,
  }
});

export const fetchSubCategory = subCategoryList => ({
  type: actionTypes.TAKE_EXAM_FETCH_SUB_CATEGORYLIST,
  payload: {
    subCategoryList,
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

export const onInputTextAreaAnswer = (text, currentActivePage, exId) => ({
  type: actionTypes.TAKE_EXAM_ON_INPUT_TEXTAREA,
  payload: {
    text,
    currentActivePage,
    exId,
  },
});

export const uploadAnswerListRequest = (id, answerList) => ({
  type: actionTypes.TAKE_EXAM_UPLOAD_REQUEST,
  payload: {
    id,
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

export const checkProgressRequest = id => ({
  type: actionTypes.TAKE_EXAM_CHECK_PROGRESS_REQUEST,
  payload: {
    id,
  }
});

export const checkProgressSuccess = progressResult => ({
  type: actionTypes.TAKE_EXAM_CHECK_PROGRESS_SUCCESS,
  payload: {
    progressResult,
  }
});

export const checkProgressFailure = messege => ({
  type: actionTypes.TAKE_EXAM_CHECK_PROGRESS_FAILURE,
  payload: {
    messege,
  }
});

export const categoryChange = category => ({
  type: actionTypes.TAKE_EXAM_CATEGORY_CHANGE,
  payload: {
    category,
  }
});
