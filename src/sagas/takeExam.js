import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchTakeExamFailure,
  fetchTakeExamSuccess,
  uploadAnswerListFailure,
  uploadAnswerListSuccess,
  checkProgressFailure,
  checkProgressSuccess,
} from '../actions/takeExam';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';
import api from '../services/api';

// the easy one
// we fetch all for test first
export function* fetchTestExamTask2() {
  try {
    const examList = yield call(api.fetchAllExam);
    console.log(examList);
    yield put(fetchTakeExamSuccess(examList));
  }
  catch (error) {
    yield put(fetchTakeExamFailure(error));
  }
}

// this is real one
// send id to fetch eprList first
// then for each category in eprlist
// we random some exam
const shuffle = (a) => {
  for (let i = a.length - 1; i >= 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export function* fetchTestExamTask(action) {
  try {
    const EPRList = yield call(api.fetchEPRList, action.payload.id);
    const rawExamList = yield call(api.fetchExamId);

    const x = [];
    for (let i = 0; i < EPRList.length; i += 1) {
      for (let j = 0; j < rawExamList.length; j += 1) {
        if (rawExamList[j].category.toLowerCase() === EPRList[i].category.toLowerCase()
          && rawExamList[j].subcategory.toLowerCase() === EPRList[i].subcategory.toLowerCase()
          && rawExamList[j].type.toLowerCase() === EPRList[i].type.toLowerCase()) {
          const idList = (shuffle(rawExamList[j].exIdList.slice())).slice(0, EPRList[i].requiredNumber);
          const temp = Object.assign({}, rawExamList[j]);
          temp.exIdList = idList.slice();
          x.push(temp);
          break;
        }
      }
    }
    console.log('test2', x);
    const examList = yield call(api.fetchExamSpecifyId, x);
    console.log('???', examList);
    const oldExamList = yield call(api.fetchAllExam);
    console.log('oldone', oldExamList);
    yield put(fetchTakeExamSuccess(examList));
  }
  catch (error) {
    yield put(fetchTakeExamFailure(error));
  }
}

export function* uploadAnswerListTask(action) {
  try {
    console.log('yield!', action.payload.category);
    const progress = yield call(api.uploadAnswer, action.payload.id, action.payload.category, action.payload.answerList);
    yield put(uploadAnswerListSuccess(progress));
  }
  catch (error) {
    yield put(uploadAnswerListFailure(error));
  }
}

export function* checkProgressTask(action) {
  try {
    const progressResult = yield call(api.checkProgress, action.payload.id, action.payload.category);
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

export function* watchFetchTakeExamRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_FETCH_REQUEST, fetchTestExamTask);
}

export function* watchUploadAnswerListRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_UPLOAD_REQUEST, uploadAnswerListTask);
}

export function* watchCheckProgressRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_CHECK_PROGRESS_REQUEST, checkProgressTask);
}

export default function* takeExamSaga() {
  yield all([
    watchFetchTakeExamRequest(),
    watchUploadAnswerListRequest(),
    watchCheckProgressRequest(),
  ]);
}
