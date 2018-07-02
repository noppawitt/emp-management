import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  edited: false
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROBATION_STORE:
      var disable;
      if(action.payload.item.passPro==false){
        if(action.payload.item.continued == true && action.payload.item.continuedDate != null){
          disable = true;
        }else if (action.payload.item.continued == false && action.payload.item.terminationDate != null){
          disable = true;
        }else disable = false;
      }else disable = true;

      return {
        ...state,
        item: action.payload.item,
        edited: disable
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
