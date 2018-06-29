import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  addExamSuccess,
  addExamFailure,
  fetchExamSuccess,
  fetchExamFailure,
  deleteExamSuccess,
  deleteExamFailure,
  editExamSuccess,
  editExamFailure
} from '../actions/exam';
import { closeModal } from '../actions/modal';
import api from '../services/api';

export function* addExamTask(action) {
  try {
    const imageArrayNotClean = localStorage.getItem('examQuestion').split('<img src="');
    const imageArray = [];
    const files = [];

    for (let i = 1; i < imageArrayNotClean.length; i += 1) {
      if ((imageArrayNotClean[i].split('" '))[0].includes('blob:http')) {
        imageArray.push((imageArrayNotClean[i].split('" '))[0]);
      }
    }

    for (let i = 0; i < imageArray.length; i += 1) {
      yield fetch(imageArray[i])
        .then(res => (res.blob()))
        .then((blob) => {
          files.push(new File([blob], String(new Date())));
        });
    }

    const imageList = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      imageList.append('image', files[i]);
    }
    // if (files.length > 0) {
    //   yield call(api.uploadImageExam, {
    //     images: imageList
    //   });
    // }

    yield call(api.addExam, {
      exam: action.payload.form,
      question: localStorage.getItem('examQuestion')
    });
    localStorage.removeItem('examQuestion');
    const exams = yield call(api.fetchExam);
    yield put(addExamSuccess(exams));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(addExamFailure(error));
    action.payload.reject();
  }
}

export function* fetchExamTask() {
  try {
    const exams = yield call(api.fetchExam);
    yield put(fetchExamSuccess(exams));
  }
  catch (error) {
    yield put(fetchExamFailure(error));
  }
}

export function* deleteExamTask(action) {
  try {
    yield call(api.deleteExam, {
      id: action.payload.id
    });
    const exams = yield call(api.fetchExam);
    yield put(deleteExamSuccess(exams));
    yield put(closeModal());
  }
  catch (error) {
    yield put(deleteExamFailure(error));
  }
}

export function* editExamTask(action) {
  try {
    const exam = yield call(api.editExam, {
      form: action.payload.form,
      question: localStorage.getItem('examQuestion')
    });
    localStorage.removeItem('examQuestion');
    yield put(editExamSuccess(exam));
    yield put(closeModal());
    action.payload.resolve();
  }
  catch (error) {
    yield put(editExamFailure(error));
    action.payload.reject();
  }
}

export function* watchaddExam() {
  yield takeEvery(actionTypes.ADD_EXAM_REQUEST, addExamTask);
}

export function* watchFetchExam() {
  yield takeEvery(actionTypes.EXAM_FETCH_REQUEST, fetchExamTask);
}

export function* watchDeleteExam() {
  yield takeEvery(actionTypes.DELETE_EXAM_REQUEST, deleteExamTask);
}

export function* watchEditExam() {
  yield takeEvery(actionTypes.EDIT_EXAM_REQUEST, editExamTask);
}

export default function* examSaga() {
  yield all([
    watchaddExam(),
    watchFetchExam(),
    watchDeleteExam(),
    watchEditExam()
  ]);
}
