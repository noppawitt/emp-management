import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchProfileSuccess } from '../actions/profile';
import api from '../services/api';

export function* fetchProfileTask(action) {
  try {
    const profile = yield call(api.fetchProfile, action.id);
    yield put(fetchProfileSuccess(profile));
  }
  catch (error) {
    console.log(error);
  }
}

export function* watchFetchProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_FETCH_REQUEST, fetchProfileTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchProfileRequest()
  ]);
}
