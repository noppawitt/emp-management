import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  lists: []
};

const employee = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EMPLOYEE_FETCH_REQUEST:
      return {
        isFetching: true
      };
    case actionTypes.EMPLOYEE_FETCH_SUCCESS:
      return {
        isFetching: false,
        lists: action.payload.employees
      };
    case actionTypes.EMPLOYEE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default employee;
