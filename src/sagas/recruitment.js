import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentSuccess,
  fetchRecruitmentFailure,
  checkPasswordStatusSuccess,
  checkPasswordStatusFailure,
  generatePasswordSuccess,
  generatePasswordFailure,
  updateUserStatus,
  checkPasswordStatusRequest
} from '../actions/recruitment';
import api from '../services/api';

export function* fetchRecruitmentTask() {
  try {
    const recruitments = yield call(api.fetchAllRecruitment);
    yield put(fetchRecruitmentSuccess(recruitments));
  }
  catch (error) {
    console.log(error);
    yield put(fetchRecruitmentFailure(error));
  }
}

export function* checkPasswordStatusTask(action) {
  try {
    // prepare variable
    const passwordObject = yield call(api.checkPasswordStatus, action.payload.cid);
    const today = (new Date()).getTime();
    const createdDay = new Date(passwordObject.lastestCreatedPasswordTime).getTime();
    const lifetimes = passwordObject.passwordLifetimes;
    const msInDay = 1000 * 60 * 60 * 24;
    const isExpired = today - createdDay > lifetimes * msInDay;
    const expireDateString = new Date(createdDay + (lifetimes * msInDay)).toString();
    if (passwordObject.password === null) {
      yield put(updateUserStatus('No password in database!', 204));
    }
    else if (isExpired) {
      yield put(updateUserStatus('Password expire@@Since : '.concat(expireDateString), 205));
    }
    else {
      yield put(updateUserStatus('Password alive@@Expire on : '.concat(expireDateString), 200));
    }
    yield put(checkPasswordStatusSuccess(passwordObject));
  }
  catch (error) {
    yield put(checkPasswordStatusFailure(error));
  }
}

export function* generatePasswordTask(action) {
  try {
    const messege = yield call(api.generatePassword, action.payload.cid, action.payload.passwordLifetimes);
    yield put(generatePasswordSuccess(messege));
    // after generation complete lets check and display it
    yield put(checkPasswordStatusRequest(action.payload.cid));
  }
  catch (error) {
    yield put(generatePasswordFailure(error));
  }
}

export function* watchFetchRecruitmentRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_FETCH_REQUEST, fetchRecruitmentTask);
}

export function* watchCheckPasswordStatusRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_CHECK_PASSWORD_STATUS_REQUEST, checkPasswordStatusTask);
}

export function* watchActivateUserRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_GENERATE_PASSWORD_REQUEST, generatePasswordTask);
}

export default function* recruitmentSaga() {
  yield all([
    watchFetchRecruitmentRequest(),
    watchCheckPasswordStatusRequest(),
    watchActivateUserRequest(),
  ]);
}
