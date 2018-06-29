import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  results: [1, 2, 3],
  activeItem: 'overall',
  searchText: '',
  startDate: null,
  endDate: null,
};

const ViewResult = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VIEW_RESULT_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        citizen_id: action.payload.citizen_id,
      };
    case actionTypes.VIEW_RESULT_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: action.payload.results,
      };
    case actionTypes.VIEW_RESULT_FETCH_FAILURE:
      return {
        ...state,
        isFetching: true,
        messege: action.payload.messege,
      };
    case actionTypes.VIEW_RESULT_CHANGE_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload.newActiveItem,
      };
    case actionTypes.FILTER_VIEW_RESULT:
      return {
        ...state,
        searchText: action.payload.searchText,
      };
    case actionTypes.FILTER_START_DATE_VIEW_RESULT:
      return {
        ...state,
        startDate: action.payload.startDate,
      };
    case actionTypes.FILTER_END_DATE_VIEW_RESULT:
      return {
        ...state,
        endDate: action.payload.endDate,
      };
    default:
      return state;
  }
};

export default ViewResult;
