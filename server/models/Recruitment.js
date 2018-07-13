const db = require('../db');

const Recruitment = {};

Recruitment.fetchAllRecruitment = () => (
  db.manyOrNone('SELECT * FROM recruitments')
);

Recruitment.checkPasswordStatus = id => (
  db.oneOrNone('SELECT id, birthdate, latest_activated_password_time, activation_lifetimes FROM exam_users2 WHERE id = $1', [id])
);

Recruitment.activatePassword = (id, lifetimes, today) => (
  db.oneOrNone('UPDATE exam_users2 SET activation_lifetimes = $2, latest_activated_password_time = $3 WHERE id = $1', [id, lifetimes, today])
);

Recruitment.uploadRandomExIdList = (randomExIdList, id, testDate) => (
  db.oneOrNone('UPDATE exam_users2 SET random_ex_id_list = $1 WHERE id = $2 AND test_date = $3', [randomExIdList, id, testDate])
);

Recruitment.getTestDate = id => (
  // refactor + change column when merge
  // appointment > test_date that similar to interview_date (appointment)
  db.one('SELECT appointment FROM recruitments WHERE citizen_id = $1', [id])
);

// Recruitment : View Result part
Recruitment.fetchExam = (id, testDate) => (
  db.manyOrNone('SELECT * FROM exam_result WHERE cd_id = $1 AND test_date = $2', [id, testDate])
);

Recruitment.fetchRandomExIdList = (id, testDate) => (
  db.oneOrNone('SELECT random_ex_id_list FROM exam_users2 WHERE id = $1 AND test_date = $2', [id, testDate])
);

Recruitment.fetchExamSpecifyId = id => (
  db.manyOrNone('SELECT'
    + ' ex_id'
    + ', ex_category'
    + ', ex_subcategory'
    + ', ex_type'
    + ', ex_question'
    + ', ex_choice'
    + ', ex_answer'
    + ', ARRAY_LENGTH(ex_answer, 1) as ex_answer_length'
    + ' FROM exams WHERE ex_id = ANY ($1)', [id])
);

Recruitment.fetchCandidateAnswer = (id, testDate) => (
  db.manyOrNone('SELECT * FROM exam_candidate_submitted WHERE id = $1 AND test_date = $2', [id, testDate])
);

Recruitment.uploadResult = (resultList) => {
  let retval = '';
  retval += Object(resultList).map(eachObject => (
    db.oneOrNone(
      'INSERT INTO exam_result (cd_id, ex_id, test_date, ex_question, ex_choices, ex_type, cd_answer, point, status, ex_correct)'
      + ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
      [
        eachObject.cd_id,
        eachObject.ex_id,
        eachObject.test_date,
        eachObject.ex_question,
        eachObject.ex_choices,
        eachObject.ex_type,
        eachObject.cd_answer,
        eachObject.point,
        eachObject.status,
        eachObject.ex_correct]
    )
  ));
  return retval;
};

module.exports = Recruitment;
