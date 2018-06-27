import * as actionTypes from '../constants/actionTypes';

export const fetchExamResultRequest = cid => ({
  type: actionTypes.VIEW_RESULT_FETCH_REQUEST,
  payload: {
    citizen_id: cid,
  }
});

export const fetchExamResultSuccess = results => ({
  type: actionTypes.VIEW_RESULT_FETCH_SUCCESS,
  payload: {
    results,
  }
});

export const fetchExamResultFailure = messege => ({
  type: actionTypes.VIEW_RESULT_FETCH_FAILURE,
  payload: {
    messege,
  }
});

export const changeActiveItemRequest = newActiveItem => ({
  type: actionTypes.VIEW_RESULT_CHANGE_ACTIVE_ITEM,
  payload: {
    newActiveItem,
  }
});

export const filterViewResult = searchText => ({
  type: actionTypes.FILTER_VIEW_RESULT,
  payload: {
    searchText,
  }
});

export const filterStartDateViewResult = startDate => ({
  type: actionTypes.FILTER_START_DATE_VIEW_RESULT,
  payload: {
    startDate,
  }
});

export const filterEndDateViewResult = endDate => ({
  type: actionTypes.FILTER_END_DATE_VIEW_RESULT,
  payload: {
    endDate,
  }
});
