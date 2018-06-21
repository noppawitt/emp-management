import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  addExamSuccess,
  addExamFailure,
  fetchExamSuccess,
  fetchExamFailure,
  deleteExamSuccess,
  deleteExamFailure
} from '../actions/exam';
import { closeModal } from '../actions/modal';
import api from '../services/api';

export function* addExamTask(action) {
  try {
    yield call(api.addExam, {
      exam: action.payload.form
    });
    const exams = yield call(api.fetchExam);
    yield put(addExamSuccess(exams));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(addExamFailure(error));
    action.payload.reject();
  }
}

export function* fetchExamTask() {
  try {
    const exams = yield call(api.fetchExam);
    yield put(fetchExamSuccess(exams));
  }
  catch (error) {
    yield put(fetchExamFailure(error));
  }
}

export function* deleteExamTask(action) {
  try {
    yield call(api.deleteExam, {
      id: action.payload.id
    });
    const exams = yield call(api.fetchExam);
    yield put(deleteExamSuccess(exams));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteExamFailure(error));
  }
}

export function* watchaddExam() {
  yield takeEvery(actionTypes.ADD_EXAM_REQUEST, addExamTask);
}

export function* watchFetchExam() {
  yield takeEvery(actionTypes.EXAM_FETCH_REQUEST, fetchExamTask);
}

export function* watchDeleteExam() {
  yield takeEvery(actionTypes.DELETE_EXAM_REQUEST, deleteExamTask);
}

export default function* examSaga() {
  yield all([
    watchaddExam(),
    watchFetchExam(),
    watchDeleteExam()
  ]);
}
