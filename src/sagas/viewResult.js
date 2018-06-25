import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchExamResultSuccess,
  fetchExamResultFailure
} from '../actions/viewResult';
import api from '../services/api';

export function* fetchExamResultTask(action) {
  try {
    const results = yield call(api.fetchExamResult, action.payload.citizen_id);
    yield put(fetchExamResultSuccess(results));
  }
  catch (error) {
    console.log(error);
    yield put(fetchExamResultFailure(error));
  }
}

export function* watchFetchViewResultRequest() {
  yield takeEvery(actionTypes.VIEW_RESULT_FETCH_REQUEST, fetchExamResultTask);
}

export default function* viewResultSaga() {
  yield all([watchFetchViewResultRequest()]);
}
