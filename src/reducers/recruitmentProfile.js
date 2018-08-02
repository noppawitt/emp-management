import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  data: [],
  currentCategory: 'overall',
  currentPage: 1,
  categoryList: [],
  overall: [],
};

const recruitmentProfile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECRUITMENT_PROFILE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.RECRUITMENT_PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
        result: action.payload.result,
        categoryList: action.payload.category,
        overall: action.payload.overall,
      };
    case actionTypes.RECRUITMENT_PROFILE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    case actionTypes.RECRUITMENT_PROFILE_MODAL_CATEGORY_CHANGE:
      return {
        ...state,
        currentCategory: action.payload.newCategory,
        currentPage: 1,
      };
    case actionTypes.RECRUITMENT_PROFILE_MODAL_PAGE_CHANGE:
      return {
        ...state,
        currentPage: action.payload.newPage,
      };
    default:
      return state;
  }
};

export default recruitmentProfile;
