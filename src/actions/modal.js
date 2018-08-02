import * as actionTypes from '../constants/actionTypes';

export const openModal = (name, props) => ({
  type: actionTypes.OPEN_MODAL,
  payload: {
    name,
    props
  }
});

export const closeModal = () => ({
  type: actionTypes.CLOSE_MODAL
});

export const clearModal = () => ({
  type: actionTypes.CLEAR_MODAL
});
