import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchOwnProjectSuccess,
  fetchOwnProjectFailure
} from '../actions/report';
import api from '../services/api';

export function* fetchOwnProjectTask(action) {
  try {
    const projects = yield call(api.fetchOwnProject, action.payload.userId, action.payload.year, action.payload.month);
    yield put(fetchOwnProjectSuccess(projects));
  }
  catch (error) {
    yield put(fetchOwnProjectFailure(error));
  }
}

export function* watchFetchOwnProjectTask() {
  yield takeEvery(actionTypes.OWN_PROJECT_FETCH_REQUEST, fetchOwnProjectTask);
}

export default function* reportSaga() {
  yield all([
    watchFetchOwnProjectTask()
  ]);
}
