import * as actionTypes from '../constants/actionTypes';

export const fetchRecruitmentRequest = () => ({
  type: actionTypes.RECRUITMENT_FETCH_REQUEST,
  payload: {
    // nothing to send
  }
});

export const fetchRecruitmentSuccess = recruitments => ({
  type: actionTypes.RECRUITMENT_FETCH_SUCCESS,
  payload: {
    recruitments
  }
});

export const fetchRecruitmentMessege = messege => ({
  type: actionTypes.RECRUITMENT_FETCH_MESSEGE,
  payload: {
    messege
  }
});

export const filterRecruitment = searchText => ({
  type: actionTypes.FILTER_RECRUITMENT,
  payload: {
    searchText
  }
});

export const sortRecruitment = (sortKey, direction) => ({
  type: actionTypes.SORT_RECRUITMENT,
  payload: {
    sortKey,
    direction
  }
});
