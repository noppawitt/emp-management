import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchEmployeeSuccess,
  fetchEmployeeFailure,
  createEmployeeSuccess,
  createEmployeeFailure,
} from '../actions/employee';
import { closeModal } from '../actions/modal';
import api from '../services/api';

function* fetchEmployeeTask() {
  try {
    const employees = yield call(api.fetchEmployee);
    yield put(fetchEmployeeSuccess(employees));
  }
  catch (error) {
    yield put(fetchEmployeeFailure(error));
  }
}

function* createEmployeeTask(action) {
  try {
    yield call(api.createEmployee, {
      user: action.payload.form
    });
    yield put(createEmployeeSuccess());
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createEmployeeFailure(error));
    action.payload.reject();
  }
}

function* watchFetchEmployeeRequest() {
  yield takeEvery(actionTypes.EMPLOYEE_FETCH_REQUEST, fetchEmployeeTask);
}

function* watchCreateEmployeeRequest() {
  yield takeEvery(actionTypes.EMPLOYEE_CREATE_REQUEST, createEmployeeTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchEmployeeRequest(),
    watchCreateEmployeeRequest()
  ]);
}
