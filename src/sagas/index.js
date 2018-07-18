import { all } from 'redux-saga/effects';
import authSaga from './auth';
import profileSaga from './profile';
import masterTableSaga from './masterTable';
import employeeSaga from './employee';
import projectSaga from './project';
import projectDetailSaga from './projectDetail';
import leaveSaga from './leave';
import timesheetSaga from './timesheet';
import holidaySaga from './holiday';
import reportSaga from './report';
import accessControlSaga from './accessControl';
import erpSaga from './erp';
import erpDetailSaga from './erpdetail';
import erpApproveSaga from './erpapprove';

export default function* rootSaga() {
  yield all([
    accessControlSaga(),
    masterTableSaga(),
    profileSaga(),
    employeeSaga(),
    projectSaga(),
    projectDetailSaga(),
    leaveSaga(),
    timesheetSaga(),
    holidaySaga(),
    reportSaga(),
    erpSaga(),
    erpDetailSaga(),
    erpApproveSaga(),
    authSaga(),
  ]);
}
