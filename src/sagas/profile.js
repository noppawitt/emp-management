import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchProfileSuccess, updateProfileSuccess } from '../actions/profile';
import { closeModal } from '../actions/modal';
import api from '../services/api';

export function* fetchProfileTask(action) {
  try {
    const generalProfile = yield call(api.fetchGeneralProfile, action.payload.id);
    const workProfile = yield call(api.fetchWorkProfile);
    const profile = Object.assign({}, generalProfile, workProfile);
    yield put(fetchProfileSuccess(profile));
  }
  catch (error) {
    console.log(error);
  }
}

export function* updateProfileTask(action) {
  try {
    // const profile = yield call(api.updateGeneralProfile, {
    //   employeeInfo: action.payload.form
    // });
    let profile;
    switch (action.payload.type) {
      case 'general':
        profile = yield call(api.updateGeneralProfile, {
          employeeInfo: action.payload.form
        });
        break;
      case 'work':
        profile = yield call(api.updateWorkProfile, {
          employeeWork: action.payload.form
        });
        break;
      default:
        console.log('error');
    }
    yield put(updateProfileSuccess(profile));
    yield put(closeModal());
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
