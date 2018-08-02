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
  const tempSubCategoryList = [];
  Object(examList).map((item) => {
    if (!categoryList.includes(item.exCategory)) categoryList.push(item.exCategory);
    if (!subCategoryList.includes([item.exCategory, item.exSubCategory].join(' '))) {
      subCategoryList.push([item.exCategory, item.exSubCategory].join(' '));
      tempSubCategoryList.push([item.exCategory, item.exSubCategory, item.exType]);
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
    tempSubCategoryList,
  };
};

export function* fetchRecruitmentProfileTask(action) {
  try {
    const applicant = {};
    applicant.profile = yield call(api.fetchRecruitmentProfile, action.payload.id);
    applicant.file = yield call(api.fetchRecruitmentFile, action.payload.id);
    const gradedExam = yield call(api.fetchGradedExam, action.payload.id);
    console.log('gradedExam\n', gradedExam);

    const object = countTheCategory(gradedExam);
    // const bigObject = yield call(api.fetchWeight, object.tempSubCategoryList);
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log(bigObject);
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    const overall = [];
    object.tempSubCategoryList.forEach((category) => {
      const tempScore = [0, 0];
      gradedExam.forEach((exam) => {
        if (category[0] === exam.exCategory
          && category[1] === exam.exSubCategory
          && category[2] === exam.exType) {
          tempScore[0] += parseInt(exam.point[0], 10);
          tempScore[1] += parseInt(exam.point[1], 10);
        }
      });
      overall.push({
        category: category[0],
        subcategory: category[1],
        type: category[2],
        score: tempScore[0],
        fullscore: tempScore[1]
      });
    });
    console.log('overall', overall);
    console.log(object.examAmountPerSubCategory);
    yield put(fetchRecruitmentProfileSuccess(applicant, gradedExam, object.examAmountPerCategory, overall));
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
