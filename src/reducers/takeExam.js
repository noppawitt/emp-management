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
  saveStatus: ' '
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
      const initialAnswerList = [];
      for (let i = 0; i < action.payload.examList.length; i += 1) {
        initialAnswerList.push({ answer: '', question: action.payload.examList[i].exId });
      }

      return {
        ...state,
        examList: action.payload.examList,
        isFetching: false,
        activeCategory: action.payload.examList[0].exCategory,
        answerList: (state.progressResult === null
          || state.progressResult.length === 0) ?
          initialAnswerList :
          state.progressResult,
        pickedAnswer: (state.progressResult === null
          || state.progressResult.length === 0) ?
          '' : state.progressResult[0].answer,
        startTime: action.payload.startTime
      };
    }
    case actionTypes.TAKE_EXAM_FETCH_FAILURE:
      return {
        ...state,
        message: action.payload.message,
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
      const copyAnswerList = [...state.answerList].slice();
      let indexAns = -1;
      for (let i = 0; i < copyAnswerList.length; i += 1) {
        console.log(copyAnswerList[i].question);
        if (copyAnswerList[i].question === action.payload.exId) {
          indexAns = i;
          break;
        }
        if (indexAns === -1 && copyAnswerList[i].question === '') {
          indexAns = i;
        }
      }
      copyAnswerList[indexAns] = {
        answer: [action.payload.text],
        question: action.payload.exId
      };
      console.log(copyAnswerList);

      return {
        ...state,
        pickedAnswer: [action.payload.text],
        answerList: copyAnswerList
      };
    }
    case actionTypes.TAKE_EXAM_UPLOAD_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.TAKE_EXAM_UPLOAD_SUCCESS: {
      const date = new Date();
      return {
        ...state,
        progress: action.payload.progress,
        isFetching: false,
        saveStatus: ('Save answers complete @ ')
          .concat(date.getHours()).concat(':')
          .concat(date.getMinutes()).concat(':')
          .concat(date.getSeconds())
      };
    }
    case actionTypes.TAKE_EXAM_UPLOAD_FAILURE:
      return {
        ...state,
        message: action.payload.message,
        saveStatus: 'Save answers error !'
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
        message: action.payload.message,
      };
    case actionTypes.TAKE_EXAM_CATEGORY_CHANGE:
      return {
        ...state,
        currentActivePage: 1,
        activeCategory: action.payload.category,
      };
    case actionTypes.TAKE_EXAM_FINISH_EXAM_REQUEST:
      return {
        ...state,
      };
    case actionTypes.TAKE_EXAM_FINISH_EXAM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: null,
        examList: [],
        currentActivePage: 1,
        activeCategory: '',
        categoryList: [],
        pickedAnswer: [],
        answerList: [],
        progressResult: [],
        saveStatus: ' '
      };
    case actionTypes.TAKE_EXAM_FINISH_EXAM_FAILURE:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default TakeExam;
