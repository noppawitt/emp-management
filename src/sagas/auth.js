import { call, put, take, race, select } from 'redux-saga/effects';
import { delay } from 'redux-saga/utils';
import jwt from 'jsonwebtoken';
import * as actionTypes from '../constants/actionTypes';
import { loginSuccess, loginFailure } from '../actions/auth';
import api from '../services/api';
import history from '../history';
import { getAuth } from '../selectors/auth';
import { setItem } from '../utils/helper';

// export function* loginTask(action) {
//   try {
//     const user = yield call(api.login, action.payload.form);
//     localStorage.setItem('token', user.token);
//     yield put(loginSuccess(user));
//     history.push('/');
//   }
//   catch (error) {
//     yield put(loginFailure(error));
//   }
// }

// export function* watchLogin() {
//   yield takeEvery(actionTypes.LOGIN_REQUEST, loginTask);
// }

// export default function* authSaga() {
//   yield all([
//     watchLogin()
//   ]);
// }

function* refreshTokenFlow() {
  while (true) {
    yield put({ type: 'REFRESH_TOKEN' });
    const { refreshToken } = yield select(getAuth);
    const { accessToken } = yield call(api.refreshToken, refreshToken);
    yield setItem('accessToken', accessToken);
    const { exp } = yield jwt.decode(accessToken);
    yield call(delay, exp);
  }
}

function* watchAuth() {
  while (true) {
    try {
      const { payload: { form } } = yield take(actionTypes.LOGIN_REQUEST);
      const user = yield call(api.login, form);
      yield setItem('accessToken', user.accessToken);
      yield setItem('refreshToken', user.refreshToken);
      yield put(loginSuccess(user));
      history.push('/');
      const { exp } = yield jwt.decode(user.accessToken);
      console.log(exp);
      yield call(delay, exp);
      yield race([
        take(actionTypes.LOGOUT),
        call(refreshTokenFlow)
      ]);
    }
    catch (error) {
      yield loginFailure(error);
    }
  }
}

export default function* authSaga() {
  yield watchAuth();
}
