import { call, put, takeEvery, all, select, take } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { fetchMasterTableRequest,
  fetchMasterTableSucesss,
  fetchMasterTableFailure,
  createAssetTypeSuccess,
  createAssetTypeFailure,
  deleteAssetTypeSuccess,
  deleteAssetTypeFailure,
  createAssetSuccess,
  createAssetFailure,
  deleteAssetSuccess,
  deleteAssetFailure,
  createCertificateSuccess,
  createCertificateFailure,
  deleteCertificateSuccess,
  deleteCertificateFailure,
  createContractSuccess,
  createContractFailure,
  deleteContractSuccess,
  deleteContractFailure,
  createDegreeSuccess,
  createDegreeFailure,
  deleteDegreeSuccess,
  deleteDegreeFailure,
  createDepartmentSuccess,
  createDepartmentFailure,
  deleteDepartmentSuccess,
  deleteDepartmentFailure,
  createFacultySuccess,
  createFacultyFailure,
  deleteFacultySuccess,
  deleteFacultyFailure,
  createLevelSuccess,
  createLevelFailure,
  deleteLevelSuccess,
  deleteLevelFailure,
  createMajorSuccess,
  createMajorFailure,
  deleteMajorSuccess,
  deleteMajorFailure,
  createPositionSuccess,
  createPositionFailure,
  deletePositionSuccess,
  deletePositionFailure,
  createUniversitySuccess,
  createUniversityFailure,
  deleteUniversitySuccess,
  deleteUniversityFailure,
  deleteUniversityRequest
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

function* deleteAssetTypeTask(action) {
  try {
    const assetTypes = yield call(api.deleteAssetType, { id: action.payload.id });
    yield put(deleteAssetTypeSuccess(assetTypes));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteAssetTypeFailure(error));
  }
}

function* addAssetTask(action) {
  try {
    const asset = yield call(api.addAsset, { asset: { assetTypeId: action.payload.form.assetTypeId, name: action.payload.form.name, serialNumber: action.payload.form.serialNumber, description: action.payload.form.description, ownFlag: 'Company' } });
    yield put(createAssetSuccess(asset));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createAssetFailure(error));
    action.payload.reject();
  }
}

function* deleteAssetTask(action) {
  try {
    const assets = yield call(api.deleteAsset, { id: action.payload.id });
    yield put(deleteAssetSuccess(assets));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteAssetFailure(error));
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

function* deleteCertificateTask(action) {
  try {
    const certificates = yield call(api.deleteCertificate, { id: action.payload.id });
    yield put(deleteCertificateSuccess(certificates));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteCertificateFailure(error));
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

function* deleteContractTask(action) {
  try {
    const contracts = yield call(api.deleteContract, { id: action.payload.id });
    yield put(deleteContractSuccess(contracts));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteContractFailure(error));
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

function* deleteDegreeTask(action) {
  try {
    const degrees = yield call(api.deleteDegree, { id: action.payload.id });
    yield put(deleteDegreeSuccess(degrees));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteDegreeFailure(error));
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

function* deleteDepartmentTask(action) {
  try {
    const departments = yield call(api.deleteDepartment, { id: action.payload.id });
    yield put(deleteDepartmentSuccess(departments));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteDepartmentFailure(error));
  }
}

function* addFacultyTask(action) {
  try {
    const faculty = yield call(api.addFaculty, { faculty: { universityId: action.payload.form.universityId, name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createFacultySuccess(faculty));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createFacultyFailure(error));
    action.payload.reject();
  }
}

function* deleteFacultyTask(action) {
  try {
    const faculties = yield call(api.deleteFaculty, { id: action.payload.id });
    yield put(deleteFacultySuccess(faculties));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteFacultyFailure(error));
  }
}

function* addLevelTask(action) {
  try {
    const level = yield call(api.addLevel, { level: { name: action.payload.form.name, description: action.payload.form.description, annualLeave: action.payload.form.annualLeave } });
    yield put(createLevelSuccess(level));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createLevelFailure(error));
    action.payload.reject();
  }
}

function* deleteLevelTask(action) {
  try {
    const levels = yield call(api.deleteLevel, { id: action.payload.id });
    yield put(deleteLevelSuccess(levels));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteLevelFailure(error));
  }
}

function* addMajorTask(action) {
  try {
    const major = yield call(api.addMajor, { major: { facultyId: action.payload.form.facultyId, name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createMajorSuccess(major));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createMajorFailure(error));
    action.payload.reject();
  }
}

function* deleteMajorTask(action) {
  try {
    const majors = yield call(api.deleteMajor, { id: action.payload.id });
    yield put(deleteMajorSuccess(majors));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteMajorFailure(error));
  }
}

function* addPositionTask(action) {
  try {
    const position = yield call(api.addPosition, { position: { name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createPositionSuccess(position));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createPositionFailure(error));
    action.payload.reject();
  }
}

function* deletePositionTask(action) {
  try {
    const positions = yield call(api.deletePosition, { id: action.payload.id });
    yield put(deletePositionSuccess(positions));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deletePositionFailure(error));
  }
}

function* addUniversityTask(action) {
  try {
    const university = yield call(api.addUniversity, { university: { name: action.payload.form.name, description: action.payload.form.description } });
    yield put(createUniversitySuccess(university));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(createUniversityFailure(error));
    action.payload.reject();
  }
}

function* deleteUniversityTask(action) {
  try {
    const universities = yield call(api.deleteUniversity, { id: action.payload.id });
    yield put(deleteUniversitySuccess(universities));
    yield put(closeModal(universities));
  }
  catch (error) {
    yield put(deleteUniversityFailure(error));
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

function* watchDeleteAssetTypeRequest() {
  yield takeEvery(actionTypes.ASSET_TYPE_DELETE_REQUEST, deleteAssetTypeTask);
}

function* watchAddAssetRequest() {
  yield takeEvery(actionTypes.ASSET_CREATE_REQUEST, addAssetTask);
}

function* watchDeleteAssetRequest() {
  yield takeEvery(actionTypes.ASSET_DELETE_REQUEST, deleteAssetTask);
}

function* watchAddCertificateRequest() {
  yield takeEvery(actionTypes.CERTIFICATE_CREATE_REQUEST, addCertificateTask);
}

function* watchDeleteCertificateRequest() {
  yield takeEvery(actionTypes.CERTIFICATE_DELETE_REQUEST, deleteCertificateTask);
}

function* watchAddContractRequest() {
  yield takeEvery(actionTypes.CONTRACT_CREATE_REQUEST, addContractTask);
}

function* watchDeleteContractRequest() {
  yield takeEvery(actionTypes.CONTRACT_DELETE_REQUEST, deleteContractTask);
}

function* watchAddDegreeRequest() {
  yield takeEvery(actionTypes.DEGREE_CREATE_REQUEST, addDegreeTask);
}

function* watchDeleteDegreeRequest() {
  yield takeEvery(actionTypes.DEGREE_DELETE_REQUEST, deleteDegreeTask);
}

function* watchAddDepartmentRequest() {
  yield takeEvery(actionTypes.DEPARTMENT_CREATE_REQUEST, addDepartmentTask);
}

function* watchDeleteDepartmentRequest() {
  yield takeEvery(actionTypes.DEPARTMENT_DELETE_REQUEST, deleteDepartmentTask);
}

function* watchAddFacultyRequest() {
  yield takeEvery(actionTypes.FACULTY_CREATE_REQUEST, addFacultyTask);
}

function* watchDeleteFacultyRequest() {
  yield takeEvery(actionTypes.FACULTY_DELETE_REQUEST, deleteFacultyTask);
}

function* watchAddLevelRequest() {
  yield takeEvery(actionTypes.LEVEL_CREATE_REQUEST, addLevelTask);
}

function* watchDeleteLevelRequest() {
  yield takeEvery(actionTypes.LEVEL_DELETE_REQUEST, deleteLevelTask);
}

function* watchAddMajorRequest() {
  yield takeEvery(actionTypes.MAJOR_CREATE_REQUEST, addMajorTask);
}

function* watchDeleteMajorRequest() {
  yield takeEvery(actionTypes.MAJOR_DELETE_REQUEST, deleteMajorTask);
}

function* watchAddPositionRequest() {
  yield takeEvery(actionTypes.POSITION_CREATE_REQUEST, addPositionTask);
}

function* watchDeletePositionRequest() {
  yield takeEvery(actionTypes.POSITION_DELETE_REQUEST, deletePositionTask);
}

function* watchAddUniversityRequest() {
  yield takeEvery(actionTypes.UNIVERSITY_CREATE_REQUEST, addUniversityTask);
}

function* watchDeleteUniversityRequest() {
  yield takeEvery(actionTypes.UNIVERSITY_DELETE_REQUEST, deleteUniversityTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchMasterTableRequest(),
    watchFetchMasterTable(),
    watchAddAssetTypeRequest(),
    watchDeleteAssetTypeRequest(),
    watchAddAssetRequest(),
    watchDeleteAssetRequest(),
    watchAddCertificateRequest(),
    watchDeleteCertificateRequest(),
    watchAddContractRequest(),
    watchDeleteContractRequest(),
    watchAddDegreeRequest(),
    watchDeleteDegreeRequest(),
    watchAddDepartmentRequest(),
    watchDeleteDepartmentRequest(),
    watchAddFacultyRequest(),
    watchDeleteFacultyRequest(),
    watchAddLevelRequest(),
    watchDeleteLevelRequest(),
    watchAddMajorRequest(),
    watchDeleteMajorRequest(),
    watchAddPositionRequest(),
    watchDeletePositionRequest(),
    watchAddUniversityRequest(),
    watchDeleteUniversityRequest()
  ]);
}
