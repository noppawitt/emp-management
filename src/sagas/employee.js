import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchEmployeeSuccess, fetchEmployeeFailure } from '../actions/employee';
import api from '../services/api';

export function* fetchEmployeeTask() {
  try {
    const employees = yield call(api.fetchEmployee);
    yield put(fetchEmployeeSuccess(employees));
  }
  catch (error) {
    yield put(fetchEmployeeFailure(error));
  }
}

export function* watchFetchEmployeeRequest() {
  yield takeEvery(actionTypes.EMPLOYEE_FETCH_REQUEST, fetchEmployeeTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchEmployeeRequest()
  ]);
}
