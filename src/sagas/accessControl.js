import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchAccessControlSuccess, fetchAccessControlFailure } from '../actions/accessControl';
import api from '../services/api';

function* fetchAccessControlTask() {
  try {
    const accessControl = yield call(api.fetchAccessControl);
    yield put(fetchAccessControlSuccess(accessControl));
  }
  catch (error) {
    yield put(fetchAccessControlFailure(error));
  }
}

function* watchFetchAccessControlTask() {
  yield takeLatest(actionTypes.ACCESS_CONTROL_FETCH_REQUEST, fetchAccessControlTask);
}

export default function* accessControlSaga() {
  yield all([
    watchFetchAccessControlTask()
  ]);
}
