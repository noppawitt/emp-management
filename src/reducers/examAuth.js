import jwt from 'jsonwebtoken';
import * as actionTypes from '../constants/actionTypes';

let initialState;
const token = localStorage.getItem('token');
if (token) {
  const user = jwt.decode(token);
  initialState = {
    isFetching: false,
    isAuthenticated: true,
    id: user.id,
  };
}
else {
  initialState = {
    isFetching: false,
    isAuthenticated: false,
  };
}

const examAuth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EXAM_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    case actionTypes.EXAM_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        id: action.payload.user.id,
      };
    case actionTypes.EXAM_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        messege: action.payload.messege,
      };
    case actionTypes.EXAM_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default examAuth;
