import * as actionTypes from '../constants/actionTypes';

export const fetchExamRequest = something => ({
  // don't forget to add this action type
  type: actionTypes.FECTH_TAKE_EXAM_PAGE_REQUEST,
  payload: {
    something
  }
});
