import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchTakeExamSuccess,
  fetchTakeExamFailure,
} from '../actions/takeExam';
import api from '../services/api';

export function* fetchTakeExamTask(action) {
  try {
    const fetchResult = yield call(api.fetchEPRList, action.payload.id);
    console.log('fetchResult', fetchResult);
    yield put(fetchTakeExamSuccess(fetchResult));
  }
  catch (error) {
    yield put(fetchTakeExamFailure(error));
  }
}

export function* watchFetchTakeExamRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_FETCH_REQUEST, fetchTakeExamTask);
}

export default function* takeExamSaga() {
  yield all([
    watchFetchTakeExamRequest(),
  ]);
}
