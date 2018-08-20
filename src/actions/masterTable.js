import * as actionTypes from '../constants/actionTypes';

export const fetchMasterTableRequest = () => ({
  type: actionTypes.MASTER_TABLE_FETCH_REQUEST
});

export const fetchMasterTableSucesss = masterTable => ({
  type: actionTypes.MASTER_TABLE_FETCH_SUCCESS,
  payload: {
    masterTable
  }
});

export const fetchMasterTableFailure = message => ({
  type: actionTypes.MASTER_TABLE_FETCH_FAILURE,
  payload: {
    message
  }
});

// Asset Type

export const createAssetTypeRequest = (form, resolve, reject) => ({
  type: actionTypes.ASSET_TYPE_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createAssetTypeSuccess = assetType => ({
  type: actionTypes.ASSET_TYPE_CREATE_SUCCESS,
  payload: {
    assetType
  }
});

export const createAssetTypeFailure = message => ({
  type: actionTypes.ASSET_TYPE_CREATE_FAILURE,
  payload: {
    message
  }
});

// Certificate

export const createCertificateRequest = (form, resolve, reject) => ({
  type: actionTypes.CERTIFICATE_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createCertificateSuccess = certificate => ({
  type: actionTypes.CERTIFICATE_CREATE_SUCCCESS,
  payload: {
    certificate
  }
});

export const createCertificateFailure = message => ({
  type: actionTypes.CERTIFICATE_CREATE_FAILURE,
  payload: {
    message
  }
});

// Contract

export const createContractRequest = (form, resolve, reject) => ({
  type: actionTypes.CONTRACT_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createContractSuccess = contract => ({
  type: actionTypes.CONTRACT_CREATE_SUCCESS,
  payload: {
    contract
  }
});

export const createContractFailure = message => ({
  type: actionTypes.CONTRACT_CREATE_FAILURE,
  payload: {
    message
  }
});

// Degree

export const createDegreeRequest = (form, resolve, reject) => ({
  type: actionTypes.DEGREE_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createDegreeSuccess = degree => ({
  type: actionTypes.DEGREE_CREATE_SUCCESS,
  payload: {
    degree
  }
});

export const createDegreeFailure = message => ({
  type: actionTypes.DEGREE_CREATE_FAILURE,
  payload: {
    message
  }
});

// Department

export const createDepartmentRequest = (form, resolve, reject) => ({
  type: actionTypes.DEPARTMENT_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createDepartmentSuccess = department => ({
  type: actionTypes.DEPARTMENT_CREATE_SUCCESS,
  payload: {
    department
  }
});

export const createDepartmentFailure = message => ({
  type: actionTypes.DEPARTMENT_CREATE_FAILURE,
  payload: {
    message
  }
});
