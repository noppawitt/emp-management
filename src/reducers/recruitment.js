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
      console.log('>>', state.startDate, action.payload.startDate);
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
    default:
      return state;
  }
};

export default Recruitment;
