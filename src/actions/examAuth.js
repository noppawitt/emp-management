import * as actionTypes from '../constants/actionTypes';
import history from '../history';

export const examLoginRequest = form => ({
  type: actionTypes.EXAM_LOGIN_REQUEST,
  payload: {
    form
  }
});

export const examLoginSuccess = user => ({
  type: actionTypes.EXAM_LOGIN_SUCCESS,
  payload: {
    user
  }
});

export const examLoginFailure = messege => ({
  type: actionTypes.EXAM_LOGIN_FAILURE,
  payload: {
    messege
  }
});

export const logout = () => {
  localStorage.removeItem('token');
  history.pushState('/login');
  return ({
    type: actionTypes.EXAM_LOGOUT,
  });
};
