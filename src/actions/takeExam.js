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

export const onPickRadioAnswer = choice => ({
  type: actionTypes.TAKE_EXAM_ON_PICK_RADIO,
  payload: {
    choice,
  },
});

export const onPickCheckboxAnswer = choice => ({
  type: actionTypes.TAKE_EXAM_ON_PICK_CHECKBOX,
  payload: {
    choice,
  },
});
