import * as actionTypes from '../constants/actionTypes';

const initialState = {};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return {
        message: action.payload.message,
        error: action.payload.error
      };
    case actionTypes.HIDE_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};

export default notification;
