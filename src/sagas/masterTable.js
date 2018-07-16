import { call, put, takeEvery, all, select, take } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchMasterTableRequest, fetchMasterTableSucesss, fetchMasterTableFailure } from '../actions/masterTable';
import { getMasterTable } from '../selectors/masterTable';
import api from '../services/api';

function* fetchMasterTableTask() {
  try {
    const masterTable = yield call(api.fetchMasterTable);
    yield put(fetchMasterTableSucesss(masterTable));
  }
  catch (error) {
    yield put(fetchMasterTableFailure(error));
  }
}

function* watchFetchMasterTableRequest() {
  yield takeEvery(actionTypes.MASTER_TABLE_FETCH_REQUEST, fetchMasterTableTask);
}

function* watchFetchMasterTable() {
  while (true) {
    const masterTable = yield select(getMasterTable);
    if (!Object.keys(masterTable).length) {
      yield put(fetchMasterTableRequest());
      yield take(actionTypes.MASTER_TABLE_FETCH_SUCCESS);
    }
  }
}

export default function* profileSaga() {
  yield all([
    watchFetchMasterTableRequest(),
    watchFetchMasterTable()
  ]);
}
