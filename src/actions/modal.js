import * as actionTypes from '../constants/actionTypes';

export const openModal = name => ({
  type: actionTypes.OPEN_MODAL,
  payload: {
    name
  }
});

export const closeModal = () => ({
  type: actionTypes.CLOSE_MODAL,
});
