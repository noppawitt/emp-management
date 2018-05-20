import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchProfileSuccess, updateProfileSuccess } from '../actions/profile';
import { closeModal } from '../actions/modal';
import api from '../services/api';

export function* fetchProfileTask(action) {
  try {
    const profile = {};
    profile.general = yield call(api.fetchGeneralProfile, action.payload.id);
    profile.work = yield call(api.fetchWorkProfile, action.payload.id);
    profile.educations = yield call(api.fetchEducationProfile, action.payload.id);
    profile.certificates = yield call(api.fetchCertificateProfile, action.payload.id);
    profile.assets = yield call(api.fetchAssetProfile, action.payload.id);
    yield put(fetchProfileSuccess(profile));
  }
  catch (error) {
    console.log(error);
  }
}

export function* updateProfileTask(action) {
  try {
    const profile = {};
    switch (action.payload.type) {
      case 'editGeneralProfile':
        profile.general = yield call(api.updateGeneralProfile, {
          employeeInfo: action.payload.form
        });
        break;
      case 'editWorkProfile':
        profile.work = yield call(api.updateWorkProfile, {
          employeeWork: action.payload.form
        });
        break;
      case 'editEducationProfile':
        profile.educations = yield call(api.updateEducationProfile, {
          educate: action.payload.form
        });
        break;
      case 'editCertificateProfile':
        profile.certificates = yield call(api.updateCertificateProfile, {
          certificate: action.payload.form
        });
        break;
      case 'editAssetProfile':
        profile.assets = yield call(api.updateAssetProfile, {
          asset: action.payload.form
        });
        break;
      case 'addEducationProfile':
        profile.educations = yield call(api.createEducationProfile, {
          educate: action.payload.form
        });
        break;
      case 'addCertificateProfile':
        profile.certificates = yield call(api.createCertificateProfile, {
          certificate: action.payload.form
        });
        break;
      case 'addAssetProfile':
        profile.assets = yield call(api.createAssetProfile, {
          asset: action.payload.form
        });
        break;
      default:
        action.payload.reject();
    }
    yield put(updateProfileSuccess(profile));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    action.payload.reject();
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
