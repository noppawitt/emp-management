import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchMasterTableSucesss, fetchMasterTableFailure } from '../actions/masterTable';
import api from '../services/api';

export function* fetchMasterTableTask() {
  try {
    const masterTable = {};
    masterTable.departments = yield call(api.fetchDepartments);
    masterTable.positions = yield call(api.fetchPositions);
    masterTable.levels = yield call(api.fetchLevels);
    masterTable.contracts = yield call(api.fetchContracts);
    yield put(fetchMasterTableSucesss(masterTable));
  }
  catch (error) {
    yield put(fetchMasterTableFailure(error));
  }
}

export function* watchFetchMasterTableRequest() {
  yield takeEvery(actionTypes.MASTER_TABLE_FETCH_REQUEST, fetchMasterTableTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchMasterTableRequest()
  ]);
}
