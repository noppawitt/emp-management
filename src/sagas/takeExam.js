import { call, put, takeEvery, all } from 'redux-saga/effects';
import moment from 'moment';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchTakeExamFailure,
  fetchTakeExamSuccess,
  uploadAnswerListFailure,
  uploadAnswerListSuccess,
  checkProgressFailure,
  checkProgressSuccess,
  fetchProgress,
  fetchCategory,
  fetchSubCategory,
  finishExamFailure,
  finishExamSuccess,
} from '../actions/takeExam';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';
import api from '../services/api';

export function* fetchTestExamTask(action) {
  try {
    const randomExIdList = yield call(api.fetchRandomExIdList, action.payload.id);
    const examList = yield call(api.fetchExamSpecifyId, randomExIdList);
    const categoryList = [];
    const subCategoryList = [];
    Object(examList).map((item) => {
      if (!categoryList.includes(item.exCategory)) categoryList.push(item.exCategory);
      if (!subCategoryList.includes([item.exCategory, item.exSubcategory].join(' '))) subCategoryList.push([item.exCategory, item.exSubcategory].join(' '));
      return 1;
    });
    const examAmountPerCategory = [];
    const examAmountPerSubCategory = [];
    for (let i = 0; i < categoryList.length; i += 1) {
      let count = 0;
      for (let j = 0; j < examList.length; j += 1) {
        if (categoryList[i] === examList[j].exCategory) {
          count += 1;
        }
      }
      examAmountPerCategory.push([categoryList[i], count]);
    }

    for (let i = 0; i < subCategoryList.length; i += 1) {
      let count = 0;
      for (let j = 0; j < examList.length; j += 1) {
        if (categoryList[i] === examList[j].exCategory && subCategoryList[i] === examList[j].exSubcategory) {
          count += 1;
        }
      }
      examAmountPerSubCategory.push([subCategoryList[i], count]);
    }
    yield put(fetchCategory(examAmountPerCategory));
    yield put(fetchSubCategory(examAmountPerSubCategory));
    const tempProgressResult = yield call(api.checkProgress, action.payload.id);
    const progressResult = [];
    if (tempProgressResult !== null) {
      for (let i = 0; i < tempProgressResult.answerList.length; i += 1) {
        progressResult.push(JSON.parse(tempProgressResult.answerList[i]));
      }
    }
    const start = moment();
    yield put(fetchProgress(progressResult));
    yield put(fetchTakeExamSuccess(examList, (tempProgressResult !== null && tempProgressResult.startTime !== null) ? moment(tempProgressResult.startTime) : start));
    if (tempProgressResult !== null && tempProgressResult.startTime === null) {
      yield call(api.updateStartTimeTakeExam, {
        startTime: start,
        id: action.payload.id
      });
    }
  }
  catch (error) {
    yield put(fetchTakeExamFailure(error));
  }
}

export function* uploadAnswerListTask(action) {
  try {
    const progress = yield call(api.uploadAnswer, action.payload.id, action.payload.answerList);
    yield put(uploadAnswerListSuccess(progress));
  }
  catch (error) {
    yield put(uploadAnswerListFailure(error));
  }
}

export function* checkProgressTask(action) {
  try {
    const progressResult = yield call(api.checkProgress, action.payload.id);
    const examProgress = yield put(checkProgressSuccess(progressResult));
    console.log(examProgress);
    yield put(openModal(modalNames.VIEW_EXAM_PROGRESS, {
      examProgress: examProgress.payload.progressResult
    }));
  }
  catch (error) {
    yield put(checkProgressFailure(error));
  }
}

export function* finishExamTask(action) {
  try {
    const now = moment();
    const timestampResult = yield call(api.updateSubmittedTime, action.payload.id, now);
    const deActivateResult = yield call(api.deActivate, action.payload.id, 'Waiting for Grading');
    console.log(timestampResult, deActivateResult);
    yield put(finishExamSuccess());
  }
  catch (error) {
    yield put(finishExamFailure(error));
  }
}

export function* watchFetchTakeExamRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_FETCH_REQUEST, fetchTestExamTask);
}

export function* watchUploadAnswerListRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_UPLOAD_REQUEST, uploadAnswerListTask);
}

export function* watchCheckProgressRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_CHECK_PROGRESS_REQUEST, checkProgressTask);
}

export function* watchFinishExamRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_FINISH_EXAM_REQUEST, finishExamTask);
}

export default function* takeExamSaga() {
  yield all([
    watchFetchTakeExamRequest(),
    watchUploadAnswerListRequest(),
    watchCheckProgressRequest(),
    watchFinishExamRequest(),
  ]);
}
