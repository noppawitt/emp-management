import * as actionTypes from '../constants/actionTypes';

const profile = (state = { isFetching: true }, action) => {
  switch (action.type) {
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
        message: action.payload.message
      };
    case actionTypes.PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        id: action.payload.id,
        form: action.payload.form
      };
    case actionTypes.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        ...action.payload.profile
      };
    case actionTypes.PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default profile;
