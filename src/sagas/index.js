import { all } from 'redux-saga/effects';
import authSaga from './auth';
import profileSaga from './profile';
import masterTableSaga from './masterTable';
import employeeSaga from './employee';

export default function* rootSaga() {
  yield all([
    authSaga(),
    profileSaga(),
    masterTableSaga(),
    employeeSaga()
  ]);
}
