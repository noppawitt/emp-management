import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  // cid: null, below this is just a mock
  id: '1234567890151',
  activeItem: '1',
  eprList: [],
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
      return {
        ...state,
        // position: action.payload.position,
        // eprList: action.payload.eprList,
        examObject: action.payload.examObject,
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
