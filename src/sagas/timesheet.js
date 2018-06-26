import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  createTimesheetSuccess,
  createTimesheetFailure,
  fetchTimesheetSuccess,
  fetchTimesheetFailure,
  updateTimesheetSuccess,
  updateTimesheetFailure
} from '../actions/timesheet';
import { closeModal } from '../actions/modal';
import api from '../services/api';

export function* createTimesheetTask(action) {
  try {
    const timesheet = yield call(api.createTimesheet, { timesheets: [action.payload.form] });
    console.log(timesheet);
    yield put(createTimesheetSuccess(timesheet));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createTimesheetFailure(error));
    action.payload.reject();
  }
}

export function* fetchTimesheetTask(action) {
  try {
    const timesheets = yield call(api.fetchTimesheet, action.payload.id);
    yield put(fetchTimesheetSuccess(timesheets));
  }
  catch (error) {
    yield put(fetchTimesheetFailure(error));
  }
}

export function* updateTimesheetTask(action) {
  try {
    const timesheet = yield call(api.updateTimesheet, { timesheet: action.payload.form });
    yield put(updateTimesheetSuccess(timesheet));
  }
  catch (error) {
    yield put(updateTimesheetFailure(error));
  }
}

export function* watchCreateTimesheetRequest() {
  yield takeEvery(actionTypes.TIMESHEET_CREATE_REQUEST, createTimesheetTask);
}

export function* watchFetchTimesheetRequest() {
  yield takeEvery(actionTypes.TIMESHEET_FETCH_REQUEST, fetchTimesheetTask);
}

export function* watchUpdateTimesheetRequest() {
  yield takeEvery(actionTypes.TIMESHEET_UPDATE_REQUEST, updateTimesheetTask);
}

export default function* timesheetSaga() {
  yield all([
    watchCreateTimesheetRequest(),
    watchFetchTimesheetRequest(),
    watchUpdateTimesheetRequest()
  ]);
}
