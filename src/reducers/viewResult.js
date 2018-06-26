import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  results: [1, 2, 3],
  activeItem: 'overall',
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
      console.log('>>>', state, '<<<');
      console.log('>>>', state.activeItem === '1');
      return {
        ...state,
        activeItem: action.payload.newActiveItem,
      };
    default:
      return state;
  }
};

export default ViewResult;
