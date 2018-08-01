import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  lists: [],
  filter: '',
  department: '',
  departmentId: 0
};

const employee = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EMPLOYEE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.EMPLOYEE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.payload.employees
      };
    case actionTypes.EMPLOYEE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    case actionTypes.FILTER_EMPLOYEE:
      return {
        ...state,
        filter: action.payload.text,
      };
    case actionTypes.FILTER_DEPARTMENT:
      return {
        ...state,
        departmentId: action.payload.departmentId
      };
    default:
      return state;
  }
};

export default employee;
