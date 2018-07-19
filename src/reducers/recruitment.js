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
    case actionTypes.GRADING_FETCH_SUCCESS: {
      const tempGradingList = action.payload.gradingList.slice();
      for (let i = 0; i < tempGradingList.length; i += 1) {
        if (tempGradingList[i].point[0] === 'UNKNOWN') {
          tempGradingList[i] = {
            ...tempGradingList[i],
            scoreWarning: '*required',
          };
        }
        if (tempGradingList[i].point[1] === 'UNKNOWN') {
          tempGradingList[i] = {
            ...tempGradingList[i],
            fullScoreWarning: '*required',
          };
        }
      }
      return {
        ...state,
        gradingId: action.payload.gradingId,
        gradingList: tempGradingList,
        isModalFetching: false,
        // variable initialization for new modal
        activeModalCategory: action.payload.gradingList[0].exCategory,
        currentActiveModalPage: 1,
        modalCategoryList: action.payload.examAmountPerCategory,
        modalSubCategoryList: action.payload.examAmountPerSubCategory,
      };
    }
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
    case actionTypes.GRADING_MODAL_SAVE_REQUEST: {
      const tempGradingList = [...state.gradingList].slice();
      for (let i = 0; i < tempGradingList.length; i += 1) {
        const tempPoint = tempGradingList[i].point;
        if (tempPoint[0].substring(tempPoint[0].length - 1) === '.') {
          tempPoint[0] = tempPoint[0].substring(0, tempPoint[0].length - 1);
        }
        if (tempPoint[1].substring(tempPoint[1].length - 1) === '.') {
          tempPoint[1] = tempPoint[1].substring(0, tempPoint[1].length - 1);
        }
        tempGradingList[i] = {
          ...tempGradingList[i],
          point: tempPoint,
        };
      }
      return {
        ...state,
        isModalFetching: true,
        gradingList: tempGradingList,
      };
    }
    case actionTypes.GRADING_MODAL_SAVE_FAILURE:
      return {
        ...state,
        isModalFetching: false,
        message: action.payload.message,
      };
    case actionTypes.GRADING_MODAL_SAVE_SUCCESS:
      return {
        ...state,
        isModalFetching: false,
      };
    case actionTypes.GRADING_MODAL_SEND_REQUEST:
      return {
        ...state,
        isModalFetching: true,
      };
    case actionTypes.GRADING_MODAL_SEND_FAILURE:
      return {
        ...state,
        isModalFetching: false,
        message: action.payload.message,
      };
    case actionTypes.GRADING_MODAL_SEND_SUCCESS:
      return {
        ...state,
        isModalFetching: false,
      };
    case actionTypes.GRADING_MODAL_INPUT_WARNING: {
      let tempScoreWarning = '';
      let tempFullScoreWarning = '';
      if (['bothScoreValueError', 'scoreValueError'].includes(action.payload.scoreStatus)) {
        tempScoreWarning = 'Please insert an non negative (1 decimal place or integer)';
      }
      if (['bothScoreValueError', 'fullScoreValueError'].includes(action.payload.scoreStatus)) {
        tempFullScoreWarning = 'Please insert an non negative (1 decimal place or integer)';
      }
      if (action.payload.scoreStatus === 'scoreValueExceed') {
        tempScoreWarning = 'Score can\'t more than Fullscore';
        tempFullScoreWarning = 'Score can\'t more than Fullscore';
      }
      else if (action.payload.scoreStatus === 'scoreWithNoFullScore') {
        tempScoreWarning = 'Non-zero isn\'t allow for Scroll when Fullscore is zero';
      }
      const tempGradingList = [...state.gradingList].slice();
      for (let i = 0; i < tempGradingList.length; i += 1) {
        if (tempGradingList[i].exId === action.payload.exId) {
          tempGradingList[i] = {
            ...tempGradingList[i],
            scoreWarning: tempScoreWarning,
            fullScoreWarning: tempFullScoreWarning,
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
