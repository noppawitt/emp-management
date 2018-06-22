import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { examLoginSuccess, examLoginFailure } from '../actions/examAuth';
import api from '../services/api';
import history from '../history';

export function* examLoginTask(action) {
  try {
    const user = yield call(api.login, action.payload.form);
    localStorage.setItem('token', user.token);
    yield put(examLoginSuccess(user));
    history.push('/');
  }
  catch (error) {
    yield put(examLoginFailure(error));
  }
}

export function* watchExamLogin() {
  yield takeEvery(actionTypes.EXAM_LOGIN_REQUEST, examLoginTask);
}

export default function* authSaga() {
  yield all([
    watchExamLogin()
  ]);
}
