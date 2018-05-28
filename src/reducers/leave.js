import * as actionTypes from '../constants/actionTypes';

const initialState = {
  lists: []
};

const leave = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LEAVE_CREATE_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    case actionTypes.LEAVE_CREATE_SUCCESS:
      return {
        ...state,
        lists: action.payload.leaves
      };
    case actionTypes.LEAVE_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.LEAVE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.LEAVE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.payload.leaves
      };
    case actionTypes.LEAVE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default leave;
