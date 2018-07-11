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
};

const Recruitment = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECRUITMENT_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.RECRUITMENT_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.payload.recruitments
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
    case actionTypes.RECRUITMENT_CHECK_PASSWORD_STATUS_REQUEST:
      return {
        ...state,
        id: action.payload.id,
        isModalFetching: true,
      };
    case actionTypes.RECRUITMENT_CHECK_PASSWORD_STATUS_SUCCESS:
      return {
        ...state,
        passwordObject: action.payload.passwordObject,
        isModalFetching: false,
      };
    case actionTypes.RECRUITMENT_CHECK_PASSWORD_STATUS_FAILURE:
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
    default:
      return state;
  }
};

export default Recruitment;
