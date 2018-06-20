import * as actionTypes from '../constants/actionTypes';

export const addExamRequest = (form, resolve, reject) => ({
  type: actionTypes.ADD_EXAM_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const addExamSuccess = exam => ({
  type: actionTypes.ADD_EXAM_SUCCESS,
  payload: {
    exam
  }
});

export const addExamFailure = message => ({
  type: actionTypes.ADD_EXAM_FAILURE,
  payload: {
    message
  }
});

export const fetchExamRequest = () => ({
  type: actionTypes.EXAM_FETCH_REQUEST
});

export const fetchExamSuccess = exams => ({
  type: actionTypes.EXAM_FETCH_SUCCESS,
  payload: {
    exams
  }
});

export const fetchExamFailure = message => ({
  type: actionTypes.EXAM_FETCH_FAILURE,
  payload: {
    message
  }
});
