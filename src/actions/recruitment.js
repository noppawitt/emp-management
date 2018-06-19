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

export const yearFilterRecruitment = yearText => ({
  type: actionTypes.YEAR_FILTER_RECRUITMENT,
  payload: {
    yearFilter: yearText,
  }
});

export const monthFilterRecruitment = monthText => ({
  type: actionTypes.MONTH_FILTER_RECRUITMENT,
  payload: {
    monthFilter: monthText,
  }
});
