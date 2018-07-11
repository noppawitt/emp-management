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

const shuffle = (a) => {
  for (let i = a.length - 1; i >= 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

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
    const createdDay = new Date(passwordObject.latestActivatedPasswordTime).getTime();
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
    yield put(checkPasswordStatusRequest(action.payload.id));
  }
  catch (error) {
    yield put(activatePasswordFailure(error));
  }
}

export function* randomExamTask(action) {
  try {
    const EPRList = yield call(api.fetchEPRList, action.payload.id);
    const rawExamList = yield call(api.fetchExamId);

    const randomExIdList = [];
    for (let i = 0; i < EPRList.length; i += 1) {
      for (let j = 0; j < rawExamList.length; j += 1) {
        if (rawExamList[j].category.toLowerCase() === EPRList[i].category.toLowerCase()
          && rawExamList[j].subcategory.toLowerCase() === EPRList[i].subcategory.toLowerCase()
          && rawExamList[j].type.toLowerCase() === EPRList[i].type.toLowerCase()) {
          const idList = (shuffle(rawExamList[j].exIdList.slice())).slice(0, EPRList[i].requiredNumber);
          const temp = Object.assign({}, rawExamList[j]);
          temp.exIdList = idList.slice();
          randomExIdList.push(temp);
          break;
        }
      }
    }
    console.log('HHHHHHHHHHHHHHHH', randomExIdList);
    const ok = yield call(api.uploadRandomExIdList, randomExIdList, action.payload.id);
    console.log('random exam ok:', ok);
  }
  catch (error) {
    console.log('random exam error:', error);
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

export function* watchRandomExamRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_RANDOM_EXAM, randomExamTask);
}

export default function* recruitmentSaga() {
  yield all([
    watchFetchRecruitmentRequest(),
    watchCheckPasswordStatusRequest(),
    watchActivateUserRequest(),
    watchRandomExamRequest(),
  ]);
}
