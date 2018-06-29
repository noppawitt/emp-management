import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentSuccess,
  fetchRecruitmentFailure,
  checkPasswordStatusRequest,
  checkPasswordStatusSuccess,
  checkPasswordStatusFailure,
  activatePasswordSuccess,
  activatePasswordFailure,
  updateUserStatus,
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
    const passwordObject = yield call(api.checkPasswordStatus, action.payload.id);
    const today = (new Date()).getTime();
    const createdDay = new Date(passwordObject.lastestActivatedPasswordTime).getTime();
    const lifetimes = passwordObject.activationLifetimes;
    const msInDay = 1000 * 60 * 60 * 24;
    const isExpired = today - createdDay > lifetimes * msInDay;
    const expireDateString = new Date(createdDay + (lifetimes * msInDay)).toString();
    if (isExpired) {
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

export function* activatePasswordTask(action) {
  try {
    const messege = yield call(api.activatePassword, action.payload.id, action.payload.activationLifetimes);
    yield put(activatePasswordSuccess(messege));
    // after generation complete lets check and display it
    yield put(checkPasswordStatusRequest(action.payload.id));
  }
  catch (error) {
    yield put(activatePasswordFailure(error));
  }
}

export function* watchFetchRecruitmentRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_FETCH_REQUEST, fetchRecruitmentTask);
}

export function* watchCheckPasswordStatusRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_CHECK_PASSWORD_STATUS_REQUEST, checkPasswordStatusTask);
}

export function* watchActivateUserRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_ACTIVATE_REQUEST, activatePasswordTask);
}

export default function* recruitmentSaga() {
  yield all([
    watchFetchRecruitmentRequest(),
    watchCheckPasswordStatusRequest(),
    watchActivateUserRequest(),
  ]);
}
