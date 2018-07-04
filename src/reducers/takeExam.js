import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  id: null,
  examList: [],
  currentActivePage: 1,
  categoryTitle: '',
  subCategoryTitle: '',
  // pickedAnswer is a list of the answer that was picked in the current page
  // when answerList is list of pickedAnswer
  pickedAnswer: [],
  answerList: [],
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
      console.log('FETCH_SUCCESS');
      console.log(action.payload.examList);
      return {
        ...state,
        examList: action.payload.examList,
        isFetching: false,
        // this is initialize for categoryTitle and subCategoryTitle!
        categoryTitle: action.payload.examList[0].exCategory,
        subCategoryTitle: action.payload.examList[0].exSubcategory,
        exId: action.payload.examList[0].exId,
        answerList: new Array(action.payload.examList.length).fill([]),
      };
    case actionTypes.TAKE_EXAM_FETCH_FAILURE:
      return {
        ...state,
        messege: action.payload.messege,
        isFetching: false,
      };
    case actionTypes.TAKE_EXAM_PAGINATION_CHANGE:
      // console.log('Check', state.answerList, [...state.answerList].splice(action.payload.value - 1, 1, []));
      // console.log('Check', state.answerList, [...state.answerList].splice(action.payload.value - 1, 1, []));
      // console.log('PickedAnswer:', state.pickedAnswer);
      // console.log('HERE', [...state.answerList].splice(action.payload.value - 1, 1, state.pickedAnswer));
      return {
        ...state,
        currentActivePage: action.payload.value,
        categoryTitle: state.examList[action.payload.value - 1].exCategory,
        subCategoryTitle: state.examList[action.payload.value - 1].exSubcategory,
        exId: state.examList[action.payload.value - 1].exId,
        // don't for change and get new save change answer!
        // this is fecth old answer from answerList
        // answerList: state.answerList.splice(action.payload.value - 1, 1, state.pickedAnswer),
        // ?
        // this mean if there is old answer use it!
        // else initial with []
        pickedAnswer: state.answerList[action.payload.value - 1] === undefined ? [] : state.answerList[action.payload.value - 1],
      };
    case actionTypes.TAKE_EXAM_SAVE_ANSWERLIST:
      return {
        ...state,
        answerList: action.payload.answerList,
      };
    case actionTypes.TAKE_EXAM_ON_PICK_RADIO:
      return {
        ...state,
        pickedAnswer: [action.payload.choice],
      };
    case actionTypes.TAKE_EXAM_ON_PICK_CHECKBOX:
      return {
        ...state,
        pickedAnswer: state.pickedAnswer.includes(action.payload.choice) ?
          [...state.pickedAnswer].splice(state.pickedAnswer.indexOf(action.payload.choice), 1) :
          [...state.pickedAnswer].push(action.payload.choice),
      };
    default:
      return state;
  }
};

export default TakeExam;
