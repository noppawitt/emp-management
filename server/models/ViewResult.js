const db = require('../db');

const ViewResult = {};

ViewResult.findByUserId = userId => (
  db.oneOrNone('SELECT * FROM examResults WHERE user_id = $1', [userId])
);

ViewResult.fetchRandomExIdList = id => (
  db.oneOrNone('SELECT random_ex_id_list FROM exam_users2 WHERE id = $1', [id])
);

ViewResult.fetchExamSpecifyId = id => (
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

ViewResult.fetchCandidateAnswer = id => (
  db.manyOrNone('SELECT * FROM exam_candidate_submitted WHERE id = $1', [id])
);

ViewResult.uploadResult = (resultList) => {
  Object(resultList).map((eachObject) => {
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
    );
    return 'OK';
  });
};

module.exports = ViewResult;
