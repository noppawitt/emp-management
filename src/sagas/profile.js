import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileSuccess,
  deleteProfileFailure,
  fetchProbationSuccess,
  fetchProbationFailure
} from '../actions/profile';
import { closeModal } from '../actions/modal';
import api from '../services/api';
import jwt from 'jsonwebtoken';

const token = jwt.decode(localStorage.getItem('token'));

export function* fetchProbationTask(action){
  try{
    const profile = {};
    profile.eva = yield call(api.fetchProbation, action.payload.id);
    yield put(fetchProbationSuccess(profile));
  }
  catch (error) {
    yield put(fetchProbationFailure(error));
  }
}

export function* fetchProfileTask(action) {
  try {
    const profile = {};
    profile.general = yield call(api.fetchGeneralProfile, action.payload.id);
    profile.work = yield call(api.fetchWorkProfile, action.payload.id);
    profile.educations = yield call(api.fetchEducationProfile, action.payload.id);
    profile.certificates = yield call(api.fetchCertificateProfile, action.payload.id);
    profile.assets = yield call(api.fetchAssetProfile, action.payload.id);
    if(token.type=='admin' || token.id == action.payload.id){
      profile.eva = yield call(api.checkProbation, action.payload.id);
      profile.perf = yield call(api.fetchPerformance, action.payload.id);
    }
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
      case 'sign':
        profile.eva = yield call(api.sign,{
          employeeSignDate : action.payload.form.employeeSignDate,
          supervisorSignDate : action.payload.form.supervisorSignDate,
          MDSignDate : action.payload.form.MDSignDate
        })
        break
      case 'addPerformance' :
        profile.perf = yield call(api.addPerformance,{
          performanceInfo: action.payload.form
        });
        break;
      case 'updatePerformance' :
        profile.perf = yield call(api.updatePerformance,{
          performanceInfo: action.payload.form
        });
        break;
      case 'updateProbation':
        profile.eva = yield call(api.updateProbation, {
          probationInfo: action.payload.form
        });
        break;
      case 'addProbation':
        profile.eva = yield call(api.addProbation, {
          probationInfo: action.payload.form
        });
        break;
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

export function* uploadProfilePictureTask(action) {
  yield console.log(action);
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

export function* watchUploadProfilePictureTask() {
  yield takeEvery(actionTypes.PROFILE_PICTURE_UPLOAD_REQUEST, uploadProfilePictureTask);
}

export function* watchFetchProbationRequest() {
  yield takeEvery(actionTypes.PROBATION_FETCH_REQUEST, fetchProbationTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchProfileRequest(),
    watchUpdateProfileRequest(),
    watchDeleteProfileRequest(),
    watchFetchProbationRequest()
  ]);
}
