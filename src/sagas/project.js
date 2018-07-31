import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchProjectSuccess,
  fetchProjectFailure,
  createProjectSuccess,
  createProjectFailure,
} from '../actions/project';
import { closeModal } from '../actions/modal';
import api from '../services/api';

function* fetchProjectTask(action) {
  try {
    const projects = yield call(api.fetchProject, action.payload.userId);
    yield put(fetchProjectSuccess(projects));
  }
  catch (error) {
    yield put(fetchProjectFailure(error));
  }
}

function* createProjectTask(action) {
  try {
    yield call(api.createProject, {
      project: action.payload.form
    });
    const projects = yield call(api.fetchProject, action.payload.id);
    yield put(createProjectSuccess(projects));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createProjectFailure(error));
    action.payload.reject();
  }
}

function* watchFetchProjectRequest() {
  yield takeEvery(actionTypes.PROJECT_FETCH_REQUEST, fetchProjectTask);
}

function* watchCreateProjectRequest() {
  yield takeEvery(actionTypes.PROJECT_CREATE_REQUEST, createProjectTask);
}

export default function* projectSaga() {
  yield all([
    watchFetchProjectRequest(),
    watchCreateProjectRequest()
  ]);
}
