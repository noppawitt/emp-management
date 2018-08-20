import { call, put, takeEvery, all, select, take } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchMasterTableRequest, fetchMasterTableSucesss, fetchMasterTableFailure, createAssetTypeRequest, createAssetTypeSuccess, createAssetTypeFailure } from '../actions/masterTable';
import { getMasterTable } from '../selectors/masterTable';
import api from '../services/api';
import { closeModal } from '../actions/modal';

function* fetchMasterTableTask() {
  try {
    const masterTable = yield call(api.fetchMasterTable);
    yield put(fetchMasterTableSucesss(masterTable));
  }
  catch (error) {
    yield put(fetchMasterTableFailure(error));
  }
}

function* addAssetTypeTask(action) {
  try {
    const assetType = yield call(api.addAssetType, { assetType: { name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createAssetTypeSuccess(assetType));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createAssetTypeFailure(error));
    action.payload.reject();
  }
}

function* watchFetchMasterTableRequest() {
  yield takeEvery(actionTypes.MASTER_TABLE_FETCH_REQUEST, fetchMasterTableTask);
}

function* watchFetchMasterTable() {
  while (true) {
    const masterTable = yield select(getMasterTable);
    yield take(actionTypes.BOOTSTRAP);
    if (!Object.keys(masterTable).length) {
      yield put(fetchMasterTableRequest());
    }
  }
}

function* watchAddAssetTypeRequest() {
  yield takeEvery(actionTypes.ASSET_TYPE_CREATE_REQUEST, addAssetTypeTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchMasterTableRequest(),
    watchFetchMasterTable(),
    watchAddAssetTypeRequest()
  ]);
}
