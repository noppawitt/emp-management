import moment from 'moment';
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  recruitments: [],
  lists: [],
  searchText: '',
  sortKey: null,
  direction: null,
  startDate: null,
  endDate: null,
  isDateFilterChange: false,
  isModalFetching: true,
  userStatus: 'N/A',
  userStatusCode: 'N/A',
  lifetimesValue: null,
  lifetimesUnit: 1,
  today: '',
  gradingId: '',
  currentModalActivePage: '',
  activeModalCategory: '',
  gradingList: [],
  modalCategoryList: [],
  modalSubCategoryList: [],
};

const Recruitment = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECRUITMENT_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.RECRUITMENT_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.payload.recruitments,
        today: moment().format('YYYY-MM-DD'),
      };
    case actionTypes.RECRUITMENT_FETCH_FAILURE:
      return {
        ...state,
        isFetching: true,
        message: action.payload.message
      };
    case actionTypes.FILTER_RECRUITMENT:
      return {
        ...state,
        searchText: action.payload.searchText
      };
    case actionTypes.FILTER_START_DATE_RECRUITMENT:
      return {
        ...state,
        startDate: action.payload.startDate,
        isDateFilterChange: true
      };
    case actionTypes.FILTER_END_DATE_RECRUITMENT:
      return {
        ...state,
        endDate: action.payload.endDate,
        isDateFilterChange: true
      };
    case actionTypes.SORT_RECRUITMENT:
      return {
        ...state,
        sortKey: action.payload.sortKey,
        direction: action.payload.direction
      };
    case actionTypes.RECRUITMENT_CHECK_USER_STATUS_REQUEST:
      return {
        ...state,
        id: action.payload.id,
        isModalFetching: true,
      };
    case actionTypes.RECRUITMENT_CHECK_USER_STATUS_SUCCESS:
      return {
        ...state,
        passwordObject: action.payload.object,
        isModalFetching: false,
      };
    case actionTypes.RECRUITMENT_CHECK_USER_STATUS_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        isModalFetching: false,
      };
    case actionTypes.RECRUITMENT_ACTIVATE_REQUEST:
      return {
        ...state,
        id: action.payload.id,
        activationLifetimes: action.payload.activationLifetimes,
        isModalFetching: true,
      };
    case actionTypes.RECRUITMENT_ACTIVATE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        isModalFetching: false,
      };
    case actionTypes.RECRUITMENT_ACTIVATE_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        isModalFetching: false,
      };
    case actionTypes.RECRUITMENT_UPDATE_USER_STATUS:
      return {
        ...state,
        userStatus: action.payload.userStatus,
        userStatusCode: action.payload.userStatusCode,
      };
    case actionTypes.RECRUITMENT_UPDATE_LIFETIMES_VALUE:
      return {
        ...state,
        lifetimesValue: action.payload.lifetimesValue,
      };
    case actionTypes.RECRUITMENT_UPDATE_LIFETIMES_UNIT:
      return {
        ...state,
        lifetimesUnit: action.payload.lifetimesUnit,
      };
    case actionTypes.RECRUITMENT_RANDOM_EXAM:
      return {
        ...state,
        // nothing to update state yet
      };
    case actionTypes.GRADING_FETCH_REQUEST:
      return {
        ...state,
        isModalFetching: true,
      };
    case actionTypes.GRADING_FETCH_SUCCESS:
      console.log('>>>', action.payload.gradingList);
      return {
        ...state,
        gradingId: action.payload.gradingId,
        gradingList: action.payload.gradingList,
        isModalFetching: false,
        // variable initialization for new modal
        activeModalCategory: action.payload.gradingList[0].exCategory,
        currentActiveModalPage: 1,
        modalCategoryList: action.payload.examAmountPerCategory,
        modalSubCategoryList: action.payload.examAmountPerSubCategory,

      };
    case actionTypes.GRADING_FETCH_FAILURE:
      return {
        ...state,
        isModalFetching: false,
        message: action.payload.message,
      };
    case actionTypes.GRADING_MODAL_PAGINATION_CHANGE:
      return {
        ...state,
        currentActiveModalPage: action.payload.value,
      };
    case actionTypes.GRADING_MODAL_CATEGORY_CHANGE:
      return {
        ...state,
        currentActiveModalPage: 1,
        activeModalCategory: action.payload.category,
      };
    case actionTypes.GRADING_MODAL_ON_INPUT_COMMENT: {
      const tempGradingList = [...state.gradingList].slice();
      for (let i = 0; i < tempGradingList.length; i += 1) {
        if (tempGradingList[i].exId === action.payload.exId) {
          tempGradingList[i] = {
            ...tempGradingList[i],
            comment: action.payload.text,
          };
        }
      }
      return {
        ...state,
        gradingList: tempGradingList,
      };
    }
    case actionTypes.GRADING_MODAL_ON_SCORE_CHANGE: {
      const tempGradingList = [...state.gradingList].slice();
      for (let i = 0; i < tempGradingList.length; i += 1) {
        if (tempGradingList[i].exId === action.payload.exId) {
          const tempPoint = tempGradingList[i].point;
          tempPoint[0] = action.payload.value;
          tempGradingList[i] = {
            ...tempGradingList[i],
            point: tempPoint,
          };
        }
      }
      return {
        ...state,
        gradingList: tempGradingList,
      };
    }
    case actionTypes.GRADING_MODAL_ON_FULLSCORE_CHANGE: {
      const tempGradingList = [...state.gradingList].slice();
      for (let i = 0; i < tempGradingList.length; i += 1) {
        if (tempGradingList[i].exId === action.payload.exId) {
          const tempPoint = tempGradingList[i].point;
          tempPoint[1] = action.payload.value;
          tempGradingList[i] = {
            ...tempGradingList[i],
            point: tempPoint,
          };
        }
      }
      return {
        ...state,
        gradingList: tempGradingList,
      };
    }
    default:
      return state;
  }
};

export default Recruitment;
