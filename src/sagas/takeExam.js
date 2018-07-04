import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchTakeExamFailure,
  fetchTakeExamSuccess,
  uploadAnswerListFailure,
  uploadAnswerListSuccess,
} from '../actions/takeExam';
import api from '../services/api';

export function* fetchTestExamTask() {
  try {
    const examList = yield call(api.fetchAllExam);
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

export function* watchFetchTakeExamRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_FETCH_REQUEST, fetchTestExamTask);
}

export function* watchUploadAnswerListRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_UPLOAD_REQUEST, uploadAnswerListTask);
}

export default function* takeExamSaga() {
  yield all([
    watchFetchTakeExamRequest(),
    watchUploadAnswerListRequest(),
  ]);
}
