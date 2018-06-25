import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
};

// edit this
const agreement = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EXAM_LIST:
      return {
        ...state,
        isFetching: true,
        id: action.payload.id,
      };
    default:
      return state;
  }
};

export default agreement;
