import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchTakeExamSuccess,
  fetchTakeExamFailure,
} from '../actions/takeExam';
import api from '../services/api';

export function* fetchTakeExamTask() {
  try {
    const cid = yield call(api.fetchTakeExam);
    // step to fetch!
    // > get cid
    // > throw cid to get list of position (epr)
    // > throw epr to get exams
    yield put(fetchTakeExamSuccess(cid));
  }
  catch (error) {
    yield put(fetchTakeExamFailure(error));
  }
}

export function* watchFetchTakeExamRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_FECTH_REQUEST, fetchTakeExamTask);
}

export default function* takeExamSaga() {
  yield all([
    watchFetchTakeExamRequest(),
  ]);
}
