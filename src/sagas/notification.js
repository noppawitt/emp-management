import { race, put, take, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actionTypes from '../constants/actionTypes';
import { hideNotification } from '../actions/notification';

function* notificationFlow() {
  while (true) {
    yield take(actionTypes.SHOW_NOTIFICATION);
    const { timeOut } = yield race({
      timeOut: delay(3000),
      hideRequest: take(actionTypes.HIDE_NOTIFICATION)
    });
    if (timeOut) {
      yield put(hideNotification());
    }
  }
}

export default function* notificationSaga() {
  yield all([
    notificationFlow()
  ]);
}
