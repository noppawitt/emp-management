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
import api from '../services/api';

// the easy one
// we fetch all for test first
export function* fetchTestExamTask() {
  try {
    const examList = yield call(api.fetchAllExam);
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
export function* fetchTestExamTask2(action) {
  try {
    const EPRList = yield call(api.fetchEPRList, action.payload.id);
    yield put(fetchTakeExamSuccess(EPRList));
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
    console.log('HERE', progressResult);
    yield put(checkProgressSuccess(progressResult));
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
