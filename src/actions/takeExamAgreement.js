import * as actionTypes from '../constants/actionTypes';

export const clickCheckbox = isAgree => ({
  type: actionTypes.TAKE_EXAM_AGREEMENT_CLICK_CHECKBOX,
  payload: {
    isAgree,
  }
});

export const clickAccept = () => ({
  type: actionTypes.TAKE_EXAM_AGREEMENT_CLICK_ACCEPT,
  payload: {
  }
});
