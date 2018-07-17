import { call, put, takeEvery, all, select, take } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchAccessControlRequest, fetchAccessControlSuccess, fetchAccessControlFailure } from '../actions/accessControl';
import { getAccessControl } from '../selectors/accessControl';
import { getAuth } from '../selectors/auth';
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
  yield takeEvery(actionTypes.ACCESS_CONTROL_FETCH_REQUEST, fetchAccessControlTask);
}

function* watchAccessControl() {
  while (true) {
    const { isAuthenticated } = yield select(getAuth);
    const can = yield select(getAccessControl);
    if (isAuthenticated && !can) {
      yield put(fetchAccessControlRequest());
      yield take(actionTypes.ACCESS_CONTROL_FETCH_SUCCESS);
    }
  }
}

export default function* accessControlSaga() {
  yield all([
    watchFetchAccessControlTask(),
    watchAccessControl()
  ]);
}
