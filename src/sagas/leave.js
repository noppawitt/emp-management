import { call, put, takeEvery, all } from 'redux-saga/effects';
import moment from 'moment';
import * as actionTypes from '../constants/actionTypes';
import {
  createLeaveSuccess,
  createLeaveFailure,
  fetchLeaveSuccess,
  fetchLeaveFailure,
  updateLeaveFailure,
  updateLeaveSuccess
} from '../actions/leave';
import { closeModal } from '../actions/modal';
import api from '../services/api';

export function* createLeaveTask(action) {
  try {
    yield call(api.createLeave, { leaveRequest: action.payload.form });
    const leaves = yield call(api.fetchLeave, action.payload.form.userId, moment(action.payload.form.leaveFrom).format('YYYY'), moment(action.payload.form.leaveFrom).format('MM'));
    yield put(createLeaveSuccess(leaves));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createLeaveFailure(error));
    action.payload.reject();
  }
}

export function* fetchLeaveTask(action) {
  try {
    const leaves = yield call(api.fetchLeave, action.payload.userId, action.payload.year, action.payload.month);
    yield put(fetchLeaveSuccess(leaves));
  }
  catch (error) {
    yield put(fetchLeaveFailure(error));
  }
}

export function* updateLeaveTask(action) {
  try {
    yield call(api.updateLeave, {
      leaveRequests: [{
        userId: action.payload.userId,
        status: action.payload.leave.status,
        leaveFrom: action.payload.leave.leaveFrom,
        leaveTo: action.payload.leave.leaveTo
      }]
    });
    const leaves = yield call(api.fetchLeave, action.payload.userId, moment(action.payload.leaveFrom).format('YYYY'), moment(action.payload.leaveFrom).format('MM'));
    yield put(updateLeaveSuccess(leaves));
    yield put(closeModal());
  }
  catch (error) {
    yield put(updateLeaveFailure(error));
  }
}

export function* watchCreateLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_CREATE_REQUEST, createLeaveTask);
}

export function* watchFetchLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_FETCH_REQUEST, fetchLeaveTask);
}

export function* watchUpdateLeaveRequest() {
  yield takeEvery(actionTypes.LEAVE_UPDATE_REQUEST, updateLeaveTask);
}

export default function* leaveSaga() {
  yield all([
    watchCreateLeaveRequest(),
    watchFetchLeaveRequest(),
    watchUpdateLeaveRequest()
  ]);
}
