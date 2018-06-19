import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentSuccess,
  fetchRecruitmentFailure
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

export function* watchFetchRecruitmentRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_FETCH_REQUEST, fetchRecruitmentTask);
}

export default function* recruitmentSaga() {
  yield all([watchFetchRecruitmentRequest()]);
}
