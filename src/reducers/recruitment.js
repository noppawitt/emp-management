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
  // unstable code zone
  isAlivePasswordExist: null,
  displayPassword: null,
  alivePassword: null,
  // use!
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
        messege: action.payload.messege
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
    // semi-unstable code zone
    case actionTypes.RECRUITMENT_CHECK_PASSWORD_STATUS_REQUEST:
      return {
        ...state,
        cid: action.payload.cid,
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
        messege: action.payload.messege,
        isModalFetching: false,
      };
    case actionTypes.RECRUITMENT_GENERATE_PASSWORD_REQUEST:
      return {
        ...state,
        cid: action.payload.cid,
        passwordLifetimes: action.payload.passwordLifetimes,
        isModalFetching: true,
      };
    case actionTypes.RECRUITMENT_GENERATE_PASSWORD_SUCCESS:
      return {
        ...state,
        messege: action.payload.messege,
        isModalFetching: false,
      };
    case actionTypes.RECRUITMENT_GENERATE_PASSWORD_FAILURE:
      return {
        ...state,
        messege: action.payload.messege,
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
      console.log('I got it from my daddy!', action.payload);
      return {
        ...state,
        lifetimesUnit: action.payload.lifetimesUnit,
      };
    default:
      return state;
  }
};

export default Recruitment;
