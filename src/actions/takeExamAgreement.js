import * as actionTypes from '../constants/actionTypes';

export const clickCheckbox = isAgree => ({
  type: actionTypes.TAKE_EXAM_AGREEMENT_CLICK_CHECKBOX,
  payload: {
    isAgree,
  }
});
