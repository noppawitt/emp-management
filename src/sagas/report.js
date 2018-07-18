import { call, put, takeEvery, all } from 'redux-saga/effects';
import { saveAs } from 'file-saver';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchOwnProjectSuccess,
  fetchOwnProjectFailure,
  downloadReportSuccess,
  downloadReportFailure,
  fetchProjectMemberFailure,
  fetchProjectMemberSuccess
} from '../actions/report';
import api from '../services/api';

function* fetchOwnProjectTask(action) {
  try {
    const projects = yield call(api.fetchOwnProject, action.payload.userId, action.payload.year, action.payload.month);
    yield put(fetchOwnProjectSuccess(projects));
  }
  catch (error) {
    yield put(fetchOwnProjectFailure(error));
  }
}

function* fetchProjectMember(action) {
  try {
    const projectDetial = yield call(api.fetchProjectDetail, action.payload.projectId);
    yield put(fetchProjectMemberSuccess(projectDetial));
  }
  catch (error) {
    yield put(fetchProjectMemberFailure(error));
  }
}

function* downloadReportTask(action) {
  try {
    const { reportType, template, userId, projectId, year, month } = action.payload;
    const file = yield call(api.downloadReport, reportType, template, userId, projectId, year, month);
    if (reportType !== 'Summary Timesheet (Year)') {
      saveAs(file, `${reportType}_${projectId}_${userId}_${year}_${month}`);
    }
    else {
      saveAs(file, `${reportType}_${year}`);
    }
    yield put(downloadReportSuccess());
  }
  catch (error) {
    yield put(downloadReportFailure());
  }
}

function* watchFetchOwnProjectTask() {
  yield takeEvery(actionTypes.OWN_PROJECT_FETCH_REQUEST, fetchOwnProjectTask);
}

function* watchDownloadReportTask() {
  yield takeEvery(actionTypes.REPORT_DOWNLOAD_REQUEST, downloadReportTask);
}

function* watchFetchOwnProjectMember() {
  yield takeEvery(actionTypes.PROJECT_MEMBER_FETCH_REQUEST, fetchProjectMember);
}

export default function* reportSaga() {
  yield all([
    watchFetchOwnProjectTask(),
    watchDownloadReportTask(),
    watchFetchOwnProjectMember()
  ]);
}
