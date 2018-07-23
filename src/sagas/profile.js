import { call, put, takeEvery, all, select, take } from 'redux-saga/effects';
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

function* fetchProfileTask(action) {
  try {
    // Wait until access control fetching complete
    let { can } = yield select(getAccessControl);
    while (!can) {
      yield take(actionTypes.ACCESS_CONTROL_FETCH_SUCCESS);
      can = yield select(getAccessControl);
    }
    const [general, work, certificates, assets] = yield all([
      call(api.fetchGeneralProfile, action.payload.userId),
      call(api.fetchWorkProfile, action.payload.userId),
      call(api.fetchCertificateProfile, action.payload.userId),
      call(api.fetchAssetProfile, action.payload.userId)
    ]);
    let workExperiences;
    if (can.workExperienceView) {
      workExperiences = yield call(api.fetchWorkExperience, action.payload.userId);
    }
    let educations;
    if (can.educateView) {
      educations = yield call(api.fetchEducationProfile, action.payload.userId);
    }
    const profile = {
      general,
      work,
      certificates,
      assets,
      workExperiences,
      educations
    };
    yield put(fetchProfileSuccess(profile));
  }
  catch (error) {
    yield put(fetchProfileFailure(error));
  }
}

function* updateProfileTask(action) {
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
      case 'addWorkExperienceProfile':
        profile.workExperience = yield call(api.createWorkExperienceProfile, {
          workExperience: action.payload.form
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

function* deleteProfileTask(action) {
  try {
    let profile;
    switch (action.payload.profileType) {
      case 'educations':
        profile = yield call(api.deleteEducationProfile, {
          id: action.payload.profileId
        });
        break;
      case 'certificates':
        profile = yield call(api.deleteCertificateProfile, {
          id: action.payload.profileId
        });
        break;
      case 'assets':
        profile = yield call(api.deleteAssetProfile, {
          id: action.payload.profileId
        });
        break;
      case 'workExperience':
        profile = yield call(api.deleteWorkExperienceProfile, {
          id: action.payload.profileId
        });
        break;
      default:
        yield put(deleteProfileFailure('Something gone wrong'));
    }
    yield put(deleteProfileSuccess(action.payload.profileType, profile));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteProfileFailure(error));
  }
}

function* updateProfilePictureTask(action) {
  try {
    const formData = new FormData();
    formData.append('userId', action.payload.userId);
    formData.append('profileImage', action.payload.picture);
    const { path } = yield call(api.updateProfilePicture, formData);
    yield put(updateProfilePictureSuccess(`${path}?time=${new Date()}`));
    yield put(closeModal());
  }
  catch (error) {
    yield put(updateProfilePictureFailure(error));
  }
}

function* watchFetchProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_FETCH_REQUEST, fetchProfileTask);
}

function* watchUpdateProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_UPDATE_REQUEST, updateProfileTask);
}

function* watchDeleteProfileRequest() {
  yield takeEvery(actionTypes.PROFILE_DELETE_REQUEST, deleteProfileTask);
}

function* watchUpdateProfilePictureRequest() {
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
