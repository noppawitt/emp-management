import * as actionTypes from '../constants/actionTypes';
import * as modalNames from '../constants/modalNames';

const initialState = {
  name: modalNames.NONE
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
