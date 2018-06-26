import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchProjectDetailSuccess,
  fetchProjectDetailFailure,
  updateProjectDetailSuccess,
  updateProjectDetailFailure,
  createMemberSuccess,
  createMemberFailure
} from '../actions/projectDetail';
import { closeModal } from '../actions/modal';
import api from '../services/api';

export function* fetchProjectDetailTask(action) {
  try {
    const projectDetail = yield call(api.fetchProjectDetail, action.payload.projectId);
    yield put(fetchProjectDetailSuccess(projectDetail));
  }
  catch (error) {
    yield put(fetchProjectDetailFailure(error));
  }
}

export function* updateProjectDetailTask(action) {
  try {
    const projectDetail = yield call(api.updateProjectDetail, { project: action.payload.form });
    yield put(updateProjectDetailSuccess(projectDetail));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(updateProjectDetailFailure(error));
    action.payload.reject();
  }
}

export function* createMemberTask(action) {
  try {
    const members = yield call(api.createMember, { hasProject: action.payload.form });
    yield put(createMemberSuccess(members));
  }
  catch (error) {
    yield put(createMemberFailure(error));
  }
}

export function* watchFetchProjectDetailRequest() {
  yield takeEvery(actionTypes.PROJECT_DETAIL_FETCH_REQUEST, fetchProjectDetailTask);
}

export function* watchUpdateProjectDetailRequest() {
  yield takeEvery(actionTypes.PROJECT_DETAIL_UPDATE_REQUEST, updateProjectDetailTask);
}

export function* watchCreateMemberRequest() {
  yield takeEvery(actionTypes.MEMBER_CREATE_REQUEST, createMemberTask);
}

export default function* projectDetailSaga() {
  yield all([
    watchFetchProjectDetailRequest(),
    watchUpdateProjectDetailRequest(),
    watchCreateMemberRequest()
  ]);
}
