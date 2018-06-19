import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  addExamSuccess,
  addExamFailure
} from '../actions/exam';
import { closeModal } from '../actions/modal';
import api from '../services/api';

export function* addExamTask(action) {
  try {
    yield call(api.addExam, {
      exam: action.payload.form
    });
    // const exam = yield call(api.fetchLeave);
    yield put(addExamSuccess('Test'));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(addExamFailure(error));
    action.payload.reject();
  }
}

export function* watchaddExamRequest() {
  yield takeEvery(actionTypes.ADD_EXAM_REQUEST, addExamTask);
}

export default function* examSaga() {
  yield all([
    watchaddExamRequest()
  ]);
}
