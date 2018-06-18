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
