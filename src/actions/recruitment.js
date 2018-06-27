import * as actionTypes from '../constants/actionTypes';

export const fetchRecruitmentRequest = () => ({
  type: actionTypes.RECRUITMENT_FETCH_REQUEST,
  payload: {}
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

export const filterStartDateRecruitment = startDate => ({
  type: actionTypes.FILTER_START_DATE_RECRUITMENT,
  payload: {
    startDate
  }
});

export const filterEndDateRecruitment = endDate => ({
  type: actionTypes.FILTER_END_DATE_RECRUITMENT,
  payload: {
    endDate
  }
});

export const sortRecruitment = (sortKey, direction) => ({
  type: actionTypes.SORT_RECRUITMENT,
  payload: {
    sortKey,
    direction
  }
});

export const isUsablePasswordExist = cid => ({
  type: actionTypes.CHECK_USABLE_PASSWORD_EXISTENCE,
  payload: {
    isAlivePasswordExist: cid,
  }
});

export const generatePassword = cid => ({
  type: actionTypes.GENERATE_PASSWORD,
  payload: {
    generatePassword: cid,
  }
});

export const displayPassword = password => ({
  type: actionTypes.DISPLAY_PASSWORD,
  payload: {
    displayPassword: password,
  }
});

export const activeUserRequest = cid => ({
  type: actionTypes.RECRUITMENT_ACTIVE_USER_REQUEST,
  payload: {
    cid,
  }
});

export const activeUserSuccess = passwordStatusObject => ({
  type: actionTypes.RECRUITMENT_ACTIVE_USER_SUCCESS,
  payload: {
    passwordStatusObject,
  }
});

export const activeUserFailure = error => ({
  type: actionTypes.RECRUITMENT_ACTIVE_USER_FAILURE,
  payload: {
    error,
  }
});
