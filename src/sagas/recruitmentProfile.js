import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentProfileSuccess,
  fetchRecruitmentProfileFailure,
} from '../actions/recruitmentProfile';
import api from '../services/api';

const countTheCategory = (examList) => {
  const categoryList = [];
  const subCategoryList = [];

  Object(examList).map((item) => {
    if (!categoryList.includes(item.exCategory)) categoryList.push(item.exCategory);
    if (!subCategoryList.includes([item.exCategory, item.exSubCategory].join(' '))) {
      subCategoryList.push([item.exCategory, item.exSubCategory].join(' '));
    }
    return 1;
  });

  const examAmountPerCategory = [];
  const examAmountPerSubCategory = [];
  for (let i = 0; i < categoryList.length; i += 1) {
    let count = 0;
    for (let j = 0; j < examList.length; j += 1) {
      if (categoryList[i] === examList[j].exCategory) { count += 1; }
    }
    examAmountPerCategory.push([categoryList[i], count]);
  }

  for (let i = 0; i < subCategoryList.length; i += 1) {
    let count = 0;
    for (let j = 0; j < examList.length; j += 1) {
      if (categoryList[i] === examList[j].exCategory
        && subCategoryList[i].split(' ')[1] === examList[j].exSubCategory) { count += 1; }
    }
    examAmountPerSubCategory.push([subCategoryList[i], count]);
  }

  return {
    examAmountPerCategory,
    examAmountPerSubCategory,
  };
};

export function* fetchRecruitmentProfileTask(action) {
  try {
    const applicant = {};
    applicant.profile = yield call(api.fetchRecruitmentProfile, action.payload.id);
    applicant.file = yield call(api.fetchRecruitmentFile, action.payload.id);
    const gradedExam = yield call(api.fetchGradingExam, action.payload.id);
    console.log('gradedExam\n', gradedExam);

    const object = countTheCategory(gradedExam);
    yield put(fetchRecruitmentProfileSuccess(applicant, gradedExam, object.examAmountPerCategory));
  }
  catch (error) {
    yield put(fetchRecruitmentProfileFailure(error));
  }
}

export function* watchFetchRecruitmentProfileRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_PROFILE_FETCH_REQUEST, fetchRecruitmentProfileTask);
}

export default function* recruitmentProfileSaga() {
  yield all([
    watchFetchRecruitmentProfileRequest(),
  ]);
}
