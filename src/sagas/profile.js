import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileSuccess,
  deleteProfileFailure,
  updateProfilePictureSuccess,
  updateProfilePictureFailure
} from '../actions/profile';
import { closeModal } from '../actions/modal';
import { getAccessControl } from '../selectors/accessControl';
import api from '../services/api';

export function* fetchProfileTask(action) {
  try {
    const can = yield select(getAccessControl);
    const profile = {};
    profile.general = yield call(api.fetchGeneralProfile, action.payload.userId);
    profile.work = yield call(api.fetchWorkProfile, action.payload.userId);
    if (can.educateView) {
      profile.educations = yield call(api.fetchEducationProfile, action.payload.userId);
    }
    profile.certificates = yield call(api.fetchCertificateProfile, action.payload.userId);
    profile.assets = yield call(api.fetchAssetProfile, action.payload.userId);
    yield put(fetchProfileSuccess(profile));
  }
  catch (error) {
    yield put(fetchProfileFailure(error));
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
      case 'addEducationProfile':
        profile.educations = yield call(api.createEducationProfile, {
          educate: action.payload.form
        });
        break;
      case 'addCertificateProfile':
        profile.certificates = yield call(api.createCertificateProfile, {
          hasCertificate: action.payload.form
        });
        break;
      case 'addAssetProfile':
        profile.assets = yield call(api.createAssetProfile, action.payload.form);
        break;
      case 'profilePicture':
        profile.general.picture = yield call(api.uploadProfilePicture, action.payload.form);
        break;
      default:
        action.payload.reject();
    }
    yield put(updateProfileSuccess(profile));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(updateProfileFailure(error));
    action.payload.reject();
  }
}

export function* deleteProfileTask(action) {
  try {
    switch (action.payload.profileType) {
      case 'education':
        yield call(api.deleteEducationProfile, {
          id: action.payload.profileId
        });
        break;
      case 'certificate':
        yield call(api.deleteCertificateProfile, {
          id: action.payload.profileId
        });
        break;
      case 'asset':
        yield call(api.deleteAssetProfile, {
          id: action.payload.profileId
        });
        break;
      default:
        yield put(deleteProfileFailure('Something gone wrong'));
    }
    yield put(deleteProfileSuccess(action.payload.profileType, action.payload.profileId));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteProfileFailure(error));
  }
}

export function* updateProfilePictureTask(action) {
  try {
    const formData = new FormData();
    formData.append('profileImage', action.payload.picture);
    formData.append('userId', action.payload.userId);
    const { path } = yield call(api.updateProfilePicture, formData);
    yield put(updateProfilePictureSuccess(`${path}?time=${new Date()}`));
    yield put(closeModal());
  }
  catch (error) {
    yield put(updateProfilePictureFailure(error));
  }
}

export function* watchFetchProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_FETCH_REQUEST, fetchProfileTask);
}

export function* watchUpdateProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_UPDATE_REQUEST, updateProfileTask);
}

export function* watchDeleteProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_DELETE_REQUEST, deleteProfileTask);
}

export function* watchUpdateProfilePictureRequest() {
  yield takeEvery(actionTypes.PROFILE_PICTURE_UPDATE_REQUEST, updateProfilePictureTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchProfileRequest(),
    watchUpdateProfileRequest(),
    watchDeleteProfileRequest(),
    watchUpdateProfilePictureRequest()
  ]);
}
