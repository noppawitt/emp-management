import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  activeItem: '1',
  id: null,
  position: '',
  category: [],
  subCategory: [],
  examObject: [],
};

const TakeExam = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TAKE_EXAM_FETCH_REQUEST:
      return {
        ...state,
        id: action.payload.id,
        isFetching: true,
      };
    case actionTypes.TAKE_EXAM_FETCH_SUCCESS:
      console.log(state.eprList, '>>>', action.payload.fetchResult);
      console.log(action.payload.fetchResult.category);
      console.log(action.payload.fetchResult.subCategory);
      return {
        ...state,
        // position: action.payload.position,
        category: action.payload.fetchResult.category,
        subCategory: action.payload.fetchResult.subCategory,
        // examObject: action.payload.examObject,
        isFetching: false,
      };
    case actionTypes.TAKE_EXAM_FETCH_FAILURE:
      return {
        ...state,
        messege: action.payload.messege,
        isFetching: false,
      };
    case actionTypes.TAKE_EXAM_CHANGE_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload.activeItem,
      };
    default:
      return state;
  }
};

export default TakeExam;
