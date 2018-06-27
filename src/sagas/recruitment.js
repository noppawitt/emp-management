import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentSuccess,
  fetchRecruitmentFailure,
  activeUserSuccess,
  activeUserFailure,
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
    const passwordStatusObject = yield call(api.checkPasswordStatus, action.payload.cid);
    const today = (new Date()).getTime();
    const expiredDay = new Date(passwordStatusObject.lastestCreatedPasswordTime).getTime();
    const lifetimes = passwordStatusObject.passwordLifetimes;
    const oneDay = 1000 * 60 * 24;
    const isExpired = expiredDay - today < lifetimes * oneDay;
    // if no password or it expired > request new one
    if (passwordStatusObject.password === null || isExpired) {
      console.log('RCM-saga > Flag 3: it\'s null or Password Expired', today, expiredDay);
      // const something = yield call(api.assignNewPassword, action.payload.cid);
      // yield put(something);
    }
    yield put(activeUserSuccess(passwordStatusObject));
  }
  catch (error) {
    yield put(activeUserFailure(error));
  }
  // catch another error here, don't do the nest try-catch
}

export function* watchFetchRecruitmentRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_FETCH_REQUEST, fetchRecruitmentTask);
}

export function* watchCheckPasswordStatusRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_ACTIVE_USER_REQUEST, checkPasswordStatusTask);
}

export default function* recruitmentSaga() {
  yield all([
    watchFetchRecruitmentRequest(),
    watchCheckPasswordStatusRequest(),
  ]);
}
