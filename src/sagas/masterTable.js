import { call, put, takeEvery, all, select, take } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchMasterTableRequest,
  fetchMasterTableSucesss,
  fetchMasterTableFailure,
  createAssetTypeSuccess,
  createAssetTypeFailure,
  createCertificateSuccess,
  createCertificateFailure,
  createContractSuccess,
  createContractFailure,
  createDegreeSuccess,
  createDegreeFailure,
  createDepartmentSuccess,
  createDepartmentFailure
} from '../actions/masterTable';
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

function* addCertificateTask(action) {
  try {
    const certificate = yield call(api.addCertificate, { certificate: { name: action.payload.form.name, institute: action.payload.form.institute, description: action.payload.form.description } });
    yield put(createCertificateSuccess(certificate));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createCertificateFailure(error));
    action.payload.reject();
  }
}

function* addContractTask(action) {
  try {
    const contract = yield call(api.addContract, { contract: { name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createContractSuccess(contract));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createContractFailure(error));
    action.payload.reject();
  }
}

function* addDegreeTask(action) {
  try {
    const degree = yield call(api.addDegree, { degree: { name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createDegreeSuccess(degree));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createDegreeFailure(error));
    action.payload.reject();
  }
}

function* addDepartmentTask(action) {
  try {
    const department = yield call(api.addDepartment, { department: { name: action.payload.form.name } });
    yield put(createDepartmentSuccess(department));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createDepartmentFailure(error));
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

function* watchAddCertificateRequest() {
  yield takeEvery(actionTypes.CERTIFICATE_CREATE_REQUEST, addCertificateTask);
}

function* watchAddContractRequest() {
  yield takeEvery(actionTypes.CONTRACT_CREATE_REQUEST, addContractTask);
}

function* watchAddDegreeRequest() {
  yield takeEvery(actionTypes.DEGREE_CREATE_REQUEST, addDegreeTask);
}

function* watchAddDepartmentRequest() {
  yield takeEvery(actionTypes.DEPARTMENT_CREATE_REQUEST, addDepartmentTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchMasterTableRequest(),
    watchFetchMasterTable(),
    watchAddAssetTypeRequest(),
    watchAddCertificateRequest(),
    watchAddContractRequest(),
    watchAddDegreeRequest(),
    watchAddDepartmentRequest()
  ]);
}
