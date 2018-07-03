import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  activeItem: '',
  id: null,
  position: '',
  category: [],
  subCategory: [],
  examObject: [],
  recentExam: [],
  answer: [],
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
      return {
        ...state,
        category: action.payload.fetchResult.category,
        subCategory: action.payload.fetchResult.subCategory,
        // activeItem: !action.payload.fetcheResult.category ? action.payload.fetchResult.category[0].category : state.activeItem,
        recentExam: new Array(action.payload.fetchResult.category.length).fill(0),
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
