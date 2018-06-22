import { all } from 'redux-saga/effects';
import authSaga from './auth';
import profileSaga from './profile';
import masterTableSaga from './masterTable';
import employeeSaga from './employee';
import projectSaga from './project';
import leaveSaga from './leave';
import timesheetSaga from './timesheet';
import examSaga from './exam';
import recruitmentSaga from './recruitment';
import examAuthSaga from './examAuth';

export default function* rootSaga() {
  yield all([
    authSaga(),
    profileSaga(),
    masterTableSaga(),
    employeeSaga(),
    projectSaga(),
    leaveSaga(),
    timesheetSaga(),
    recruitmentSaga(),
    examSaga(),
    examAuthSaga(),
  ]);
}
