import * as actionTypes from '../constants/actionTypes';

export const fetchRecruitmentProfileRequest = id => ({
  type: actionTypes.RECRUITMENT_PROFILE_FETCH_REQUEST,
  payload: {
    id
  }
});

export const fetchRecruitmentProfileSuccess = (data, result, category, overall) => ({
  type: actionTypes.RECRUITMENT_PROFILE_FETCH_SUCCESS,
  payload: {
    data,
    result,
    category,
    overall,
  }
});

export const fetchRecruitmentProfileFailure = message => ({
  type: actionTypes.RECRUITMENT_PROFILE_FETCH_FAILURE,
  payload: {
    message
  }
});

export const categoryModalChange = newCategory => ({
  type: actionTypes.RECRUITMENT_PROFILE_MODAL_CATEGORY_CHANGE,
  payload: {
    newCategory,
  }
});

export const pageModalChange = newPage => ({
  type: actionTypes.RECRUITMENT_PROFILE_MODAL_PAGE_CHANGE,
  payload: {
    newPage,
  },
});
