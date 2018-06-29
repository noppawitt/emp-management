import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  // cid: null, below this is just a mock
  cid: '1234567890151',
  activeItem: null,
  eprList: [],
};

const TakeExam = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TAKE_EXAM_FECTH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.TAKE_EXAM_FECTH_SUCCESS:
      return {
        ...state,
        position: action.payload.position,
        eprList: action.payload.eprList,
        exam: action.payload.exam,
        isFetching: true,
      };
    case actionTypes.TAKE_EXAM_FECTH_FAILURE:
      return {
        ...state,
        messege: action.payload.messege,
        isFetching: true,
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
