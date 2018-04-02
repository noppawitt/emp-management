import jwtDecode from 'jwt-decode';
import * as actionTypes from '../constants/actionTypes';

let initialState;
const token = localStorage.getItem('token');
if (token) {
  const user = jwtDecode(token);
  initialState = {
    isFetching: false,
    isAuthenticated: true,
    id: user.id,
    username: user.username
  };
}
else {
  initialState = {
    isFetching: false,
    isAuthenticated: false
  };
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        id: action.user.id,
        username: action.user.username
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.message
      };
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true
      };
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.message
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default auth;
