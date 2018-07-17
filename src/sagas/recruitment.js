import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentRequest,
  fetchRecruitmentFailure,
  fetchRecruitmentSuccess,
  checkUserStatusRequest,
  checkUserStatusFailure,
  checkUserStatusSuccess,
  activateUserFailure,
  activateUserSuccess,
  fetchGradingFailure,
  fetchGradingSuccess,
  updateUserStatus,
  fetchResultFailure,
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

const countTheCategory = (examList) => {
  const categoryList = [];
  const subCategoryList = [];

  Object(examList).map((item) => {
    const subCategoryString = [item.exCategory, item.exSubcategory].join(' ');
    if (!categoryList.includes(item.exCategory)) categoryList.push(item.exCategory);
    if (!subCategoryList.includes(subCategoryString)) subCategoryList.push(subCategoryString);
    return 1;
  });

  const examAmountPerCategory = [];
  const examAmountPerSubCategory = [];
  for (let i = 0; i < categoryList.length; i += 1) {
    let count = 0;
    for (let j = 0; j < examList.length; j += 1) {
      if (categoryList[i] === examList[j].exCategory) { count += 1; }
    }
    examAmountPerCategory.push([categoryList[i], count]);
  }

  for (let i = 0; i < subCategoryList.length; i += 1) {
    let count = 0;
    for (let j = 0; j < examList.length; j += 1) {
      if (categoryList[i] === examList[j].exCategory
        && subCategoryList[i] === examList[j].exSubcategory) { count += 1; }
    }
    examAmountPerSubCategory.push([subCategoryList[i], count]);
  }

  return {
    examAmountPerCategory,
    examAmountPerSubCategory,
  };
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

export function* checkUserStatusTask(action) {
  try {
    const testDate = yield call(api.getTestDate, action.payload.id);
    const object = yield call(api.checkUserStatus, action.payload.id, testDate);
    const today = (new Date()).getTime();
    const createdDay = new Date(object.latestActivatedTime).getTime();
    const lifetimes = object.activationLifetimes;
    const msInDay = 1000 * 60 * 60 * 24;
    const isExpired = today - createdDay > lifetimes * msInDay;
    const expireDateString = new Date(createdDay + (lifetimes * msInDay)).toString();
    if (isExpired) {
      yield put(updateUserStatus('Password expire@@Since : '.concat(expireDateString), 205));
    }
    else {
      yield put(updateUserStatus('Password alive@@Expire on : '.concat(expireDateString), 200));
    }
    yield put(checkUserStatusSuccess(object));
  }
  catch (error) {
    yield put(checkUserStatusFailure(error));
  }
}

export function* activateUserTask(action) {
  try {
    const testDate = yield call(api.getTestDate, action.payload.id);
    const message = yield call(api.activateUser, action.payload.id, testDate, action.payload.activationLifetimes);
    yield put(activateUserSuccess(message));
    yield put(checkUserStatusRequest(action.payload.id));
  }
  catch (error) {
    yield put(activateUserFailure(error));
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
    yield call(api.uploadRandomExIdList, action.payload.id, testDate, randomExIdList);
  }
  catch (error) {
    console.log('random exam error:', error);
  }
}

export function* fetchGradingTask(action) {
  try {
    const gradingExamList = yield call(api.fetchGradingExam, action.payload.id, action.payload.testDate);
    console.log('>> fetchResult:', gradingExamList);
    // dont forget to change last parameter to 'Complete'
    const retval = yield call(api.changeStatus, action.payload.id, 'Wait for Grading');
    if (retval === 'OK') {
      yield put(fetchRecruitmentRequest());
    }
    const object = countTheCategory(gradingExamList);
    console.log('after function we got this >', object);
    yield put(fetchGradingSuccess(
      gradingExamList,
      action.payload.id,
      // don't forget to add this two on action and reducer
      object.examAmountPerCategory,
      object.examAmountPerSubCategory
    ));
    yield put(openModal(modalNames.GRADING_EXAM));
  }
  catch (error) {
    yield put(fetchGradingFailure(error));
  }
}

export function* viewResultTask(action) {
  try {
    const resultList = yield call(api.fetchGradingExam, action.payload.id, action.payload.testDate);
    yield put(openModal(modalNames.VIEW_RESULT, { id: action.payload.id, testDate: action.payload.testDate, resultList }));
  }
  catch (error) {
    yield put(fetchResultFailure(error));
  }
}

export function* watchFetchRecruitmentRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_FETCH_REQUEST, fetchRecruitmentTask);
}

export function* watchCheckUserStatusRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_CHECK_USER_STATUS_REQUEST, checkUserStatusTask);
}

export function* watchActivateUserRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_ACTIVATE_REQUEST, activateUserTask);
}

export function* watchRandomExamRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_RANDOM_EXAM, randomExamTask);
}

export function* watchEvaluateExam() {
  yield takeEvery(actionTypes.GRADING_FETCH_REQUEST, fetchGradingTask);
}

export function* watchViewResult() {
  yield takeEvery(actionTypes.VIEW_RESULT_EVALUATE_EXAM, viewResultTask);
}

export default function* recruitmentSaga() {
  yield all([
    watchFetchRecruitmentRequest(),
    watchCheckUserStatusRequest(),
    watchActivateUserRequest(),
    watchRandomExamRequest(),
    watchEvaluateExam(),
    watchViewResult(),
  ]);
}
