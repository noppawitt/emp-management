import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchTakeExamFailure,
  fetchTakeExamSuccess,
  uploadAnswerListFailure,
  uploadAnswerListSuccess,
  checkProgressFailure,
  checkProgressSuccess,
  fetchProgress,
} from '../actions/takeExam';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';
import api from '../services/api';

export function* fetchTestExamTask(action) {
  try {
    const randomExIdList = yield call(api.fetchRandomExIdList, action.payload.id);
    const examList = yield call(api.fetchExamSpecifyId, randomExIdList);
    console.log('HERE is the examlist', examList);
    const progressResult = yield call(api.checkProgress, action.payload.id);
    console.log(progressResult);
    yield put(fetchProgress(progressResult));
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
