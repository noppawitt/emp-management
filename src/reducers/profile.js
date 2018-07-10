import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  edited: false,
  proFetching: false
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_PROBATION_STORE:
      return {
        ...state,
        edited: false,
        evaInfo: null,
        perfInfo: null
      }
    case actionTypes.UPDATE_PROBATION_STORE:
      var disable;
      if(action.payload.item.passPro && !action.payload.item.confirmed) {
        if(action.payload.item.basedSalary || action.payload.item.mobile || action.payload.item.transporationAllowance || action.payload.item.otherAllowance)disable = true;
        else disable = false
      }
      else if(action.payload.item.passPro === undefined) disable = true
      else disable = true
      return {
        ...state,
        item: action.payload.item,
        edited: disable
      };
    case actionTypes.PERFORMANCE_FETCH_REQUEST:
      return{
        ...state,
        proFetching: true,
        id: action.payload.id
      };
    case actionTypes.PERFORMANCE_FETCH_SUCCESS:
      return {
        ...state,
        proFetching: false,
        ...action.payload.profile
      };
    case actionTypes.PERFORMANCE_FETCH_FAILURE:
      return {
        ...state,
        proFetching: false,
        message: action.payload.message
      };
    case actionTypes.PROBATION_FETCH_REQUEST:
      return{
        ...state,
        proFetching: true,
        id: action.payload.id
      };
    case actionTypes.PROBATION_FETCH_SUCCESS:
      return {
        ...state,
        proFetching: false,
        ...action.payload.profile
      };
    case actionTypes.PROBATION_FETCH_FAILURE:
      return {
        ...state,
        proFetching: false,
        message: action.payload.message
      };
    case actionTypes.PROFILE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        id: action.payload.id
      };
    case actionTypes.PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.payload.profile
      };
    case actionTypes.PROFILE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        submitting: false,
        message: action.payload.message
      };
    case actionTypes.PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        submitting: true,
        form: action.payload.form
      };
    case actionTypes.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        submitting: false,
        edited:false,
        item:null,
        ...action.payload.profile
      };
    case actionTypes.PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        submitting: false,
        item:null,
        message: action.payload.message
      };
    case actionTypes.PROFILE_DELETE_REQUEST:
      return {
        ...state,
        profileType: action.payload.profileType,
        profileId: action.payload.profileId,
        isDeleting: true
      };
    case actionTypes.PROFILE_DELETE_SUCCESS:
      return {
        ...state,
        [`${action.payload.profileType}s`]: state[`${action.payload.profileType}s`].filter(p => p.id !== action.payload.profileId),
        isDeleting: false
      };
    case actionTypes.PROFILE_DELETE_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        isDeleting: false
      };
    default:
      return state;
  }
};

export default profile;
