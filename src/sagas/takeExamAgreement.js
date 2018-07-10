import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import api from '../services/api';
import {
  startExamFailure,
  startExamSuccess,
} from '../actions/takeExamAgreement';

export function* startExamTask() {
  try {
    const status = yield call(api.startExam());
    console.log(status);
    yield put(startExamSuccess(status));
  }
  catch (error) {
    yield put(startExamFailure(error));
  }
}

export function* watchStartExamRequest() {
  yield takeEvery(actionTypes.TAKE_EXAM_AGREEMENT_START_EXAM_REQUEST, startExamTask);
}

export default function* takeExamAgreementSagae() {
  yield all([
    watchStartExamRequest(),
  ]);
}
