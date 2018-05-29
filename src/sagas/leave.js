import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  createLeaveSuccess,
  createLeaveFailure,
  fetchLeaveSuccess,
  fetchLeaveFailure
} from '../actions/leave';
import api from '../services/api';

export function* createLeaveTask(action) {
  try {
    yield call(api.createLeave, {
      leaveRequest: action.payload.form
    });
    const leaves = yield call(api.fetchLeave);
    yield put(createLeaveSuccess(leaves));
    action.resolve();
  }
  catch (error) {
    yield put(createLeaveFailure(error));
    action.reject();
  }
}

export function* fetchLeaveTask() {
  try {
    const leaves = yield call(api.fetchLeave);
    yield put(fetchLeaveSuccess(leaves));
  }
  catch (error) {
    yield put(fetchLeaveFailure(error));
  }
}

export function* watchCreateLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_CREATE_REQUEST, createLeaveTask);
}

export function* watchFetchLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_FETCH_REQUEST, fetchLeaveTask);
}

export default function* leaveSaga() {
  yield all([
    watchCreateLeaveRequest(),
    watchFetchLeaveRequest()
  ]);
}
