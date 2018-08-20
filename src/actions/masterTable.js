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
