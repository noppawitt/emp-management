import { call, put, takeEvery, all } from 'redux-saga/effects';
import moment from 'moment';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchHolidaySuccess,
  fetchHolidayFailure,
  createHolidayFailure
} from '../actions/holiday';
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
    const holidays = yield call(api.deleteHoliday, { id: action.payload.id, year: action.payload.year });
    yield put(fetchHolidaySuccess(holidays));
    yield put(closeModal());
  }
  catch (error) {
    yield put(fetchHolidayFailure(error));
  }
}
function* addHolidayTask(action) {
  try {
    const holidays = yield call(api.addHoliday, { holiday: { date: action.payload.form.date , dateName: action.payload.form.dateName }, year: moment(action.payload.form.date).format('YYYY') });
    yield put(fetchHolidaySuccess(holidays));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createHolidayFailure(error));
    action.payload.reject();
  }
}

function* watchFetchHolidayRequest() {
  yield takeEvery(actionTypes.HOLIDAY_FETCH_REQUEST, fetchHolidayTask);
}

function* watchDeleteHolidayRequest() {
  yield takeEvery(actionTypes.HOLIDAY_DELETE_REQUEST, deleteHolidayTask);
}

function* watchAddHolidayRequest() {
  yield takeEvery(actionTypes.HOLIDAY_CREATE_REQUEST, addHolidayTask);
}

export default function* leaveSaga() {
  yield all([
    watchFetchHolidayRequest(),
    watchDeleteHolidayRequest(),
    watchAddHolidayRequest()
  ]);
}
