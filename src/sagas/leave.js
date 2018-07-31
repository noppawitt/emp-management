import { call, put, takeEvery, all } from 'redux-saga/effects';
import moment from 'moment';
import * as actionTypes from '../constants/actionTypes';
import {
  createLeaveSuccess,
  createLeaveFailure,
  fetchLeaveSuccess,
  fetchLeaveFailure,
  updateLeaveFailure,
  updateLeaveSuccess,
  fetchLeaveHistoryFailure,
  fetchLeaveHistorySuccess,
  fetchLeaveAllSuccess
} from '../actions/leave';
import { closeModal } from '../actions/modal';
import api from '../services/api';

function* createLeaveTask(action) {
  try {
    yield call(api.createLeave, { leaveRequest: action.payload.form });
    const { userId } = action.payload.form;
    const leaves = yield call(api.fetchLeave, action.payload.form.userId, moment(action.payload.form.leaveFrom).format('YYYY'), moment(action.payload.form.leaveFrom).format('MM'));
    yield put(createLeaveSuccess(leaves));
    const leaveHistory = yield call(api.fetchLeaveHistory, userId, moment().format('YYYY'));
    yield put(fetchLeaveHistorySuccess(leaveHistory));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createLeaveFailure(error));
    action.payload.reject();
  }
}

function* fetchLeaveTask(action) {
  try {
    const leaves = yield call(api.fetchLeave, action.payload.userId, action.payload.year, action.payload.month);
    yield put(fetchLeaveSuccess(leaves));
  }
  catch (error) {
    yield put(fetchLeaveFailure(error));
  }
}

function* updateLeaveTask(action) {
  try {
    yield call(api.updateLeave, {
      leaveRequests: [{
        userId: action.payload.userId,
        status: action.payload.leave.status,
        leaveFrom: action.payload.leave.leaveFrom,
        leaveTo: action.payload.leave.leaveTo,
        code: action.payload.leave.code
      }]
    });
    if (action.payload.leave.status === 'Cancel') {
      const leaves = yield call(api.fetchLeave, action.payload.userId, moment(action.payload.leaveFrom).format('YYYY'), moment(action.payload.leaveFrom).format('MM'));
      yield put(updateLeaveSuccess(leaves));
      const leaveHistory = yield call(api.fetchLeaveHistory, action.payload.userId, moment().format('YYYY'));
      yield put(fetchLeaveHistorySuccess(leaveHistory));
    }
    else if (action.payload.leave.status === 'Approve' || action.payload.leave.status === 'Reject') {
      const leaves = yield call(api.fetchLeaveAll);
      yield put(fetchLeaveAllSuccess(leaves));
    }
    yield put(closeModal());
  }
  catch (error) {
    yield put(updateLeaveFailure(error));
  }
}

function* fetchLeaveHistoryTask(action) {
  try {
    const leaves = yield call(api.fetchLeaveHistory, action.payload.userId, action.payload.year);
    yield put(fetchLeaveHistorySuccess(leaves));
  }
  catch (error) {
    yield put(fetchLeaveHistoryFailure(error));
  }
}

function* fetchLeaveAllTask(action) {
  try {
    const leaves = yield call(api.fetchLeaveAll);
    yield put(fetchLeaveAllSuccess(leaves));
  }
  catch (error) {
    yield put(fetchLeaveFailure(error));
  }
}

function* watchCreateLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_CREATE_REQUEST, createLeaveTask);
}

function* watchFetchLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_FETCH_REQUEST, fetchLeaveTask);
}

function* watchUpdateLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_UPDATE_REQUEST, updateLeaveTask);
}

function* watchFetchLeaveHistoryRequest() {
  yield takeEvery(actionTypes.LEAVE_HISTORY_FETCH_REQUEST, fetchLeaveHistoryTask);
}

function* watchFetchLeaveAllRequest() {
  yield takeEvery(actionTypes.LEAVE_FETCH_ALL_REQUEST, fetchLeaveAllTask);
}

export default function* leaveSaga() {
  yield all([
    watchCreateLeaveRequest(),
    watchFetchLeaveRequest(),
    watchUpdateLeaveRequest(),
    watchFetchLeaveHistoryRequest(),
    watchFetchLeaveAllRequest()
  ]);
}
