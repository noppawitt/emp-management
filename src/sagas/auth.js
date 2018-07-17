import { call, put, take, race, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actionTypes from '../constants/actionTypes';
import { loginSuccess, loginFailure, logout } from '../actions/auth';
import api from '../services/api';
import history from '../history';
import { getItem, setItem, getExpiryTime } from '../utils/helper';
import { getAuth } from '../selectors/auth';
import { bootstrap } from '../actions/bootstrap';

function* authFlow() {
  while (true) {
    const { isAuthenticated } = yield select(getAuth);
    let accessToken;
    if (isAuthenticated) {
      accessToken = yield getItem('accessToken');
    }
    else {
      const { payload: { form } } = yield take(actionTypes.LOGIN_REQUEST);
      try {
        const user = yield call(api.login, form);
        ({ accessToken } = user);
        yield setItem('accessToken', accessToken);
        yield setItem('refreshToken', user.refreshToken);
        yield put(loginSuccess(user));
        yield history.push('/');
      }
      catch (error) {
        yield put(loginFailure(error));
        continue;
      }
    }
    yield put(bootstrap());
    let loggedOut;
    while (!loggedOut) {
      const { expired } = yield race({
        expired: delay(getExpiryTime(accessToken)),
        logoutRequest: take(actionTypes.LOGOUT)
      });
      if (expired) {
        // Refresh
        try {
          yield put({ type: 'REFRESH_TOKEN' });
          const refreshToken = yield getItem('refreshToken');
          ({ accessToken } = yield call(api.refreshToken, { refreshToken }));
          yield setItem('accessToken', accessToken);
        }
        catch (error) {
          // Force logout
          loggedOut = true;
          yield put(logout());
        }
      }
      else {
        // Logout
        loggedOut = true;
      }
    }
  }
}

export default function* authSaga() {
  yield authFlow();
}
