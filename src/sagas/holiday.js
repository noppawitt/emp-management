import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchHolidaySuccess,
  fetchHolidayFailure
} from '../actions/holiday';
// import { closeModal } from '../actions/modal';
import api from '../services/api';
import { closeModal } from '../actions/modal';

function* fetchHolidayTask(action) {
  try {
    const holidays = yield call(api.fetchHolidays, action.payload.year, action.payload.month);
    yield put(fetchHolidaySuccess(holidays));
  }
  catch (error) {
    yield put(fetchHolidayFailure(error));
  }
}
function* deleteHolidayTask(action) {
  try {
    const holidays = yield call(api.deleteHoliday, { holidayId: action.payload.holidayId, year: action.payload.year });
    yield put(fetchHolidaySuccess(holidays));
    yield put(closeModal());
  }
  catch (error) {
    yield put(fetchHolidayFailure(error));
  }
}

function* watchFetchHolidayRequest() {
  yield takeEvery(actionTypes.HOLIDAY_FETCH_REQUEST, fetchHolidayTask);
}

function* watchDeleteHolidayRequest() {
  yield takeEvery(actionTypes.HOLIDAY_DELETE_REQUEST, deleteHolidayTask);
}

export default function* leaveSaga() {
  yield all([
    watchFetchHolidayRequest(),
    watchDeleteHolidayRequest()
  ]);
}
