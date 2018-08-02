import * as actionTypes from '../constants/actionTypes';

const initialState = {
  stack: [
    {
      name: null,
      props: null
    }
  ]
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        stack: [
          ...state.stack,
          {
            name: action.payload.name,
            props: action.payload.props
          }
        ]
      };
    case actionTypes.CLOSE_MODAL:
      return {
        stack: state.stack.slice(0, -1)
      };
    case actionTypes.CLEAR_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modal;
