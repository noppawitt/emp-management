import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  results: [],
};

const ViewResult = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VIEW_RESULT_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        citizen_id: action.payload.citizen_id,
      };
    case actionTypes.VIEW_RESULT_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: action.payload.results,
      };
    case actionTypes.VIEW_RESULT_FETCH_FAILURE:
      return {
        ...state,
        isFetching: true,
        messege: action.payload.messege,
      };
    default:
      return state;
  }
};

export default ViewResult;
