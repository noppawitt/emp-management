import * as actionTypes from '../constants/actionTypes';

export const fetchExamListRequest = id => ({
  type: actionTypes.FETCH_EXAM_LIST_REQUEST,
  payload: {
    id,
  }
});
