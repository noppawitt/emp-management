import * as actionTypes from '../constants/actionTypes';

const initialState = {
  name: null
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        name: action.payload.name
      };
    case actionTypes.CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modal;
