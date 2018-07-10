import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isAgree: false,
};

// edit this
const agreement = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TAKE_EXAM_AGREEMENT_CLICK_CHECKBOX:
      return {
        ...state,
        isAgree: action.payload.isAgree,
      };
    default:
      return state;
  }
};

export default agreement;
