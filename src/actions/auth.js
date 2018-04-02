import * as actionTypes from '../constants/actionTypes';
import api from '../services/api';
import history from '../routes/history';

// Login
export const loginRequest = form => ({
  type: actionTypes.LOGIN_REQUEST,
  form
});

export const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  user
});

export const loginFailure = message => ({
  type: actionTypes.LOGIN_FAILURE,
  message
});

// Signup
export const signupRequest = form => ({
  type: actionTypes.SIGNUP_REQUEST,
  form
});

export const signupSuccess = user => ({
  type: actionTypes.SIGNUP_SUCCESS,
  user
});

export const signupFailure = message => ({
  type: actionTypes.SIGNUP_FAILURE,
  message
});

export const signup = form => (dispatch) => {
  dispatch(signupRequest(form));
  return api.signup(form)
    .then((user) => {
      dispatch(signupSuccess(user));
    })
    .catch((error) => {
      dispatch(signupFailure(error));
    });
};

export const logout = () => {
  localStorage.removeItem('token');
  history.push('/login');
  return ({
    type: actionTypes.LOGOUT
  });
};
