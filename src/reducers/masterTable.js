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
    case actionTypes.FACULTY_CREATE_SUCCESS:
      return {
        ...state,
        faculties: [...state.faculties, action.payload.faculty]
      };
    case actionTypes.FACULTY_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.LEVEL_CREATE_SUCCESS:
      return {
        ...state,
        levels: [...state.levels, action.payload.level]
      };
    case actionTypes.LEVEL_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.MAJOR_CREATE_SUCCESS:
      return {
        ...state,
        majors: [...state.majors, action.payload.major]
      };
    case actionTypes.MAJOR_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.POSITION_CREATE_SUCCESS:
      return {
        ...state,
        positions: [...state.positions, action.payload.position]
      };
    case actionTypes.POSITION_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.UNIVERSITY_CREATE_SUCCESS:
      return {
        ...state,
        universities: [...state.universities, action.payload.university]
      };
    case actionTypes.UNIVERSITY_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default masterTable;
