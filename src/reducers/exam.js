import * as actionTypes from '../constants/actionTypes';

const initialState = {
  lists: []
};

const exam = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_EXAM_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    case actionTypes.ADD_EXAM_SUCCESS:
      return {
        ...state,
        lists: action.payload.exam
      };
    case actionTypes.ADD_EXAM_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default exam;
