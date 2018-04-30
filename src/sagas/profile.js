import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchProfileSuccess, updateProfileSuccess } from '../actions/profile';
import api from '../services/api';

export function* fetchProfileTask(action) {
  try {
    const profile = yield call(api.fetchGeneralProfile, action.payload.id);
    yield put(fetchProfileSuccess(profile));
  }
  catch (error) {
    console.log(error);
  }
}

export function* updateProfileTask(action) {
  try {
    const profile = yield call(api.updateGeneralProfile, {
      employeeInfo: action.payload.form
    });
    yield put(updateProfileSuccess(profile));
  }
  catch (error) {
    console.log(error);
  }
}

export function* watchFetchProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_FETCH_REQUEST, fetchProfileTask);
}

export function* watchUpdateProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_UPDATE_REQUEST, updateProfileTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchProfileRequest(),
    watchUpdateProfileRequest()
  ]);
}
