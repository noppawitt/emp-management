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
    case actionTypes.RECRUITMENT_ACTIVE_USER_REQUEST:
      return {
        ...state,
        cid: action.payload.cid,
      };
    case actionTypes.RECRUITMENT_ACTIVE_USER_SUCCESS:
      return {
        ...state,
        passwordStatusObject: action.payload.passwordStatusObject,
      };
    case actionTypes.RECRUITMENT_ACTIVE_USER_FAILURE:
      return {
        ...state,
        messege: action.payload.messege,
      };

    // unstable code zone
    case actionTypes.CHECK_ALIVE_PASSWORD_EXISTENCE:
      return {
        ...state,
        isAlivePasswordExist: action.payload.isAlivePasswordExist,
      };
    case actionTypes.DISPLAY_PASSWORD:
      return {
        ...state,
        displayPassword: action.payload.displayPassword,
      };
    default:
      return state;
  }
};

export default Recruitment;
