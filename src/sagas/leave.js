import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchLeaveSuccess, fetchLeaveFailure } from '../actions/leave';
import api from '../services/api';

export function* fetchLeaveTask() {
  try {
    const leaves = yield call(api.fetchLeave);
    yield put(fetchLeaveSuccess(leaves));
  }
  catch (error) {
    yield put(fetchLeaveFailure(error));
  }
}

export function* watchFetchLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_FETCH_REQUEST, fetchLeaveTask);
}

export default function* leaveSaga() {
  yield all([
    watchFetchLeaveRequest()
  ]);
}
