import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchTimesheetSuccess,
  fetchTimesheetFailure
} from '../actions/timesheet';
import api from '../services/api';

export function* fetchTimesheetTask(action) {
  try {
    const timesheets = yield call(api.fetchTimesheet, action.payload.id);
    yield put(fetchTimesheetSuccess(timesheets));
  }
  catch (error) {
    yield put(fetchTimesheetFailure(error));
  }
}

export function* watchFetchTimesheetRequest() {
  yield takeEvery(actionTypes.TIMESHEET_FETCH_REQUEST, fetchTimesheetTask);
}

export default function* timesheetSaga() {
  yield all([
    watchFetchTimesheetRequest(),
  ]);
}
