import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { closeModal } from '../actions/modal';
import {
  fetchErpApproveSuccess,
  fetchErpApproveFailure,
  // approveErpRequest
} from '../actions/erpapprove';
import api from '../services/api';

export function* fetchErpApproveTask() {
  try {
    const approve = yield call(api.fetchApprove);
    yield put(fetchErpApproveSuccess(approve));
  }
  catch (error) {
    yield put(fetchErpApproveFailure(error));
  }
}

export function* approveMethodTask(action) {
  try {
    console.log(action.payload.approveId);
    yield call(api.approveUpdate, {
      id: action.payload.approveId,
      comment: action.payload.comment,
      approvement: 1
    });
    yield put(closeModal());
    yield put(closeModal());
    window.location.reload();
  }
  catch (error) {
    console.log(error);
  }
}

export function* rejectMethodTask(action) {
  try {
    console.log(action.payload);
    yield call(api.approveUpdate, {
      id: action.payload.approveId.id,
      comment: action.payload.approveId.comment,
      approvement: 2
    });
    yield put(closeModal());
    window.location.reload();
  }
  catch (error) {
    console.log(error);
  }
}

export function* watchFetchErpApproveRequest() {
  yield takeEvery(actionTypes.ERPAPPROVE_FETCH_REQUEST, fetchErpApproveTask);
}

export function* watchApproveErpRequest() {
  yield takeEvery(actionTypes.ERPAPPROVE_APPROVE_REQUEST, approveMethodTask);
}

export function* watchRejectErpRequest() {
  yield takeEvery(actionTypes.ERPAPPROVE_REJECT_REQUEST, rejectMethodTask);
}
// export function* watchCreateErpDetailRequest() {
//   yield takeEvery(actionTypes.ERPDETAIL_CREATE_REQUEST, createErpDetailTask);
// }

export default function* erpApproveSaga() {
  yield all([
    watchFetchErpApproveRequest(),
    watchApproveErpRequest(),
    watchRejectErpRequest(),
    // watchCreateErpDetailRequest()
  ]);
}
