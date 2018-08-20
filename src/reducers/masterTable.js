import * as actionTypes from '../constants/actionTypes';

const masterTable = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.MASTER_TABLE_FETCH_REQUEST:
      return {
        isFetching: true
      };
    case actionTypes.MASTER_TABLE_FETCH_SUCCESS:
      return {
        isFetching: false,
        ...action.payload.masterTable
      };
    case actionTypes.MASTER_TABLE_FETCH_FAILURE:
      return {
        isFetching: false,
        message: action.payload.message
      };
    case actionTypes.ASSET_TYPE_CREATE_SUCCESS:
      return {
        ...state,
        assetTypes: [...state.assetTypes, action.payload.assetType]
      };
    case actionTypes.ASSET_TYPE_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.CERTIFICATE_CREATE_SUCCCESS:
      return {
        ...state,
        certificates: [...state.certificates, action.payload.certificate]
      };
    case actionTypes.CERTIFICATE_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.CONTRACT_CREATE_SUCCESS:
      return {
        ...state,
        contracts: [...state.contracts, action.payload.contract]
      };
    case actionTypes.CONTRACT_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.DEGREE_CREATE_SUCCESS:
      return {
        ...state,
        degrees: [...state.degrees, action.payload.degree]
      };
    case actionTypes.DEGREE_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.DEPARTMENT_CREATE_SUCCESS:
      return {
        ...state,
        departments: [...state.departments, action.payload.department]
      };
    case actionTypes.DEPARTMENT_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default masterTable;
