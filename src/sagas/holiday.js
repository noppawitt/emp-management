import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchHolidaySuccess,
  fetchHolidayFailure
} from '../actions/holiday';
// import { closeModal } from '../actions/modal';
import api from '../services/api';

function* fetchHolidayTask(action) {
  try {
    const holidays = yield call(api.fetchHolidays, action.payload.userId, action.payload.year, action.payload.month);
    yield put(fetchHolidaySuccess(holidays));
  }
  catch (error) {
    yield put(fetchHolidayFailure(error));
  }
}

function* watchFetchHolidayRequest() {
  yield takeEvery(actionTypes.HOLIDAY_FETCH_REQUEST, fetchHolidayTask);
}

export default function* leaveSaga() {
  yield all([
    watchFetchHolidayRequest()
  ]);
}
