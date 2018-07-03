import { call, put, takeEvery, all } from 'redux-saga/effects';
import { saveAs } from 'file-saver';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchOwnProjectSuccess,
  fetchOwnProjectFailure,
  downloadReportSuccess,
  downloadReportFailure
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

export function* downloadReportTask(action) {
  try {
    const { reportType, template, userId, projectId, year, month } = action.payload;
    const file = yield call(api.downloadReport, reportType, template, userId, projectId, year, month);
    saveAs(file);
    yield put(downloadReportSuccess());
  }
  catch (error) {
    yield put(downloadReportFailure());
  }
}

export function* watchFetchOwnProjectTask() {
  yield takeEvery(actionTypes.OWN_PROJECT_FETCH_REQUEST, fetchOwnProjectTask);
}

export function* watchDownloadReportTask() {
  yield takeEvery(actionTypes.REPORT_DOWNLOAD_REQUEST, downloadReportTask);
}

export default function* reportSaga() {
  yield all([
    watchFetchOwnProjectTask(),
    watchDownloadReportTask()
  ]);
}
