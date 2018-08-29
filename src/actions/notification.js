import * as actionTypes from '../constants/actionTypes';

export const showNotification = (message, error = false) => ({
  type: actionTypes.SHOW_NOTIFICATION,
  payload: {
    message,
    error
  }
});

export const hideNotification = () => ({
  type: actionTypes.HIDE_NOTIFICATION
});
