import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  id: null,
  examList: [],
  currentActivePage: 1,
  activeCategory: '',
  categoryList: [],
  pickedAnswer: [],
  answerList: [],
  progressResult: [],
};

const TakeExam = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TAKE_EXAM_FETCH_REQUEST:
      return {
        ...state,
        id: action.payload.id,
        isFetching: true,
      };
    case actionTypes.TAKE_EXAM_FETCH_SUCCESS: {
      console.log('MMMMNNM', state.progressResult);
      return {
        ...state,
        examList: action.payload.examList,
        isFetching: false,
        activeCategory: action.payload.examList[0].exCategory,
        exId: action.payload.examList[0].exId,
        answerList: (state.progressResult === null
          || state.progressResult === []) ?
          new Array(action.payload.examList.length).fill({ answer: '', question: '' }) :
          state.progressResult,
        pickedAnswer: (state.progressResult === null
          || state.progressResult === []) ?
          '' : state.progressResult[0].answer,
      };
    }
    case actionTypes.TAKE_EXAM_FETCH_FAILURE:
      return {
        ...state,
        messege: action.payload.messege,
        isFetching: false,
      };
    case actionTypes.TAKE_EXAM_FETCH_PROGRESS:
      return {
        ...state,
        progressResult: action.payload.progressResult,
      };
    case actionTypes.TAKE_EXAM_FETCH_CATEGORYLIST:
      return {
        ...state,
        categoryList: action.payload.categoryList,
      };
    case actionTypes.TAKE_EXAM_FETCH_SUB_CATEGORYLIST:
      return {
        ...state,
        subCategoryList: action.payload.subCategoryList,
      };
    case actionTypes.TAKE_EXAM_PAGINATION_CHANGE:
      return {
        ...state,
        currentActivePage: action.payload.value,
        exId: state.examList[action.payload.value - 1].exId,
        pickedAnswer: state.answerList[action.payload.value - 1] === { answer: '', question: '' } ?
          { answer: '', question: '' } : state.answerList[action.payload.value - 1].answer,
      };
    case actionTypes.TAKE_EXAM_ON_PICK_RADIO:
      return {
        ...state,
        pickedAnswer: [action.payload.choice],
        answerList: [...state.answerList.slice(0, action.payload.currentActivePage - 1), {
          answer: [action.payload.choice],
          question: action.payload.exId,
        }, ...state.answerList.slice(action.payload.currentActivePage)]
      };
    case actionTypes.TAKE_EXAM_ON_PICK_CHECKBOX:
      return {
        ...state,
        pickedAnswer: state.pickedAnswer.includes(action.payload.choice) ?
          [...state.pickedAnswer].splice(state.pickedAnswer.indexOf(action.payload.choice), 1) :
          [...state.pickedAnswer].push(action.payload.choice),
        answerList: [...state.answerList.slice(0, action.payload.currentActivePage - 1), {
          answer: [action.payload.choice],
          question: action.payload.exId,
        }, ...state.answerList.slice(action.payload.currentActivePage)]
      };
    case actionTypes.TAKE_EXAM_ON_INPUT_TEXTAREA: {
      console.log(action.payload.currentActivePage);
      return {
        ...state,
        pickedAnswer: [action.payload.text],
        answerList: [...state.answerList.slice(0, action.payload.currentActivePage - 1), {
          answer: [action.payload.text],
          question: action.payload.exId,
        }, ...state.answerList.slice(action.payload.currentActivePage)]
      };
    }
    case actionTypes.TAKE_EXAM_UPLOAD_REQUEST:
      console.log('UPLOAD REQUEST!');
      return {
        ...state,
        // don't need to update state
      };
    case actionTypes.TAKE_EXAM_UPLOAD_SUCCESS:
      return {
        ...state,
        progress: action.payload.progress,
      };
    case actionTypes.TAKE_EXAM_UPLOAD_FAILURE:
      return {
        ...state,
        messege: action.payload.messege,
      };
    case actionTypes.TAKE_EXAM_CHECK_PROGRESS_REQUEST:
      return {
        ...state,
        // nothing to update state yet
      };
    case actionTypes.TAKE_EXAM_CHECK_PROGRESS_SUCCESS:
      return {
        ...state,
        progressResult: action.payload.progressResult,
      };
    case actionTypes.TAKE_EXAM_CHECK_PROGRESS_FAILURE:
      return {
        ...state,
        messege: action.payload.messege,
      };
    case actionTypes.TAKE_EXAM_CATEGORY_CHANGE:
      return {
        ...state,
        currentActivePage: 1,
        activeCategory: action.payload.category,
      };
    case actionTypes.TAKE_EXAM_FINISH_EXAM:
      return {
        ...state,
        // nothing to update state yet...
      };
    default:
      return state;
  }
};

export default TakeExam;
