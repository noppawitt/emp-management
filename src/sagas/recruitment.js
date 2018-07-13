import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentRequest,
  fetchRecruitmentFailure,
  fetchRecruitmentSuccess,
  checkPasswordStatusRequest,
  checkPasswordStatusFailure,
  checkPasswordStatusSuccess,
  activatePasswordFailure,
  activatePasswordSuccess,
  fetchResultFailure,
  fetchResultSuccess,
  updateUserStatus,
} from '../actions/recruitment';
import api from '../services/api';
import * as modalNames from '../constants/modalNames';
import { openModal } from '../actions/modal';

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
    const testDate = yield call(api.getTestDate, action.payload.id);
    const message = yield call(api.activatePassword, action.payload.id, action.payload.activationLifetimes, testDate);
    yield put(activatePasswordSuccess(message));
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
    const testDate = yield call(api.getTestDate, action.payload.id);
    yield call(api.uploadRandomExIdList, randomExIdList, action.payload.id, testDate);
  }
  catch (error) {
    console.log('random exam error:', error);
  }
}

export function* evaluateExamTask(action) {
  try {
    yield call(api.grading, action.payload.id, action.payload.testDate);
    const examList = yield call(api.fetchExam, action.payload.id, action.payload.testDate);
    console.log('>> fetchResult:', examList);
    const retval = yield call(api.changeStatus(action.payload.id, 'Complete'));
    if (retval === 'OK') {
      yield put(fetchRecruitmentRequest());
    }
    // put fetchSuccess for update state?
    yield put(fetchResultSuccess(examList));
    // after update result of evaluation exam list state
    yield put(openModal(modalNames.VIEW_RESULT));
  }
  catch (error) {
    yield put(fetchResultFailure(error));
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

export function* watchEvaluateExam() {
  yield takeEvery(actionTypes.VIEW_RESULT_EVALUATE_EXAM, evaluateExamTask);
}

export default function* recruitmentSaga() {
  yield all([
    watchFetchRecruitmentRequest(),
    watchCheckPasswordStatusRequest(),
    watchActivateUserRequest(),
    watchRandomExamRequest(),
    watchEvaluateExam(),
  ]);
}
