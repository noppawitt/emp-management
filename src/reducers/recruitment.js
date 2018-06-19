import * as actionTypes from '../constants/actionTypes';

const initialState = {
  // isFetch
  recruitments: [],
  lists: [],
  yearFilter: '',
  monthFilter: ''
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
    case actionTypes.YEAR_FILTER_RECRUITMENT:
      return {
        ...state,
        yearFilter: action.payload.yearFilter
      };
    case actionTypes.MONTH_FILTER_RECRUITMENT:
      return {
        ...state,
        monthFilter: action.payload.monthFilter
      };
    default:
      return state;
  }
};

export default Recruitment;
