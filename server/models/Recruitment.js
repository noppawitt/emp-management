const db = require('../db');

const Recruitment = {};

Recruitment.fetchAllRecruitment = () => (
  db.manyOrNone('SELECT * FROM recruitments')
);

Recruitment.checkUserStatus = (id, testDate) => (
  db.oneOrNone('SELECT id, latest_activated_time, activation_lifetimes'
    + ' FROM exam_users2 WHERE id = $1 AND test_date = $2', [id, testDate])
);

Recruitment.checkExamUser = (id, testDate) => (
  db.oneOrNone('SELECT 1 FROM exam_users2 WHERE id = $1 AND test_date = $2', [id, testDate])
);

Recruitment.createExamUser = (id, testDate, createDate, updateDate, createUser, updateUser, latestActivatedTime, activationLifetimes) => (
  db.none(
    'INSERT INTO exam_users2'
    + '(id, test_date, created_date, updated_date, created_user, updated_user, '
    + 'latest_activated_time, activation_lifetimes, agreement_status) '
    + 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9)',
    [
      id, testDate, createDate, updateDate, createUser, updateUser,
      latestActivatedTime, activationLifetimes, 'NotRead'
    ]
  )
);

Recruitment.activateUser = (id, lifetimes, today) => (
  db.oneOrNone('UPDATE exam_users2 SET activation_lifetimes = $2, latest_activated_time = $3 WHERE id = $1', [id, lifetimes, today])
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
// 456 refactor
// exCorrect , exAnswer for more clear-&-clean-ness
// maybe ex_choices or ex_choice too
Recruitment.fetchGradingExam = (id, testDate) => (
  db.manyOrNone(
    'SELECT'
    + ' exam_result.cd_id AS cd_id,'
    + ' exam_result.ex_id AS ex_id,'
    + ' exam_result.test_date AS test_date,'
    + ' exam_result.cd_answer AS cd_answer,'
    + ' exam_result.point AS point,'
    + ' exam_result.status AS status,'
    + ' exam_result.comment AS comment,'
    + ' exams.ex_type AS ex_type,'
    + ' exams.ex_choice AS ex_choices,'
    + ' exams.ex_answer AS ex_correct,'
    + ' exams.ex_question AS ex_question,'
    + ' exams.ex_category AS ex_category,'
    + ' exams.ex_subcategory AS ex_sub_category,'
    + ' ARRAY_LENGTH(exams.ex_answer, 1) AS ex_answer_length'
    + ' FROM exam_result, exams'
    + ' WHERE exam_result.ex_id = exams.ex_id'
    + ' AND exam_result.cd_id = $1'
    + ' AND exam_result.test_date = $2',
    [id, testDate]
  )
);

Recruitment.uploadGradeProgress = gradingList => (
  db.tx((t) => {
    const queryList = [];
    Object(gradingList).map((eachOne) => {
      const query = t.oneOrNone(
        'UPDATE exam_result SET'
        + ' status = $4,'
        + ' point = $5,'
        + ' comment = $6'
        + ' WHERE cd_id = $1'
        + ' AND ex_id = $2'
        + ' AND test_date = $3',
        [
          eachOne.cdId,
          eachOne.exId,
          eachOne.testDate,
          eachOne.status,
          eachOne.point,
          eachOne.comment,
        ]
      );
      queryList.push(query);
    });
    return t.batch(queryList);
  })
);

Recruitment.changeStatus = (id, status) => (
  db.oneOrNone('UPDATE recruitments SET status = $2 WHERE citizen_id = $1', [id, status])
);

Recruitment.checkStatus = id => (
  db.oneOrNone('SELECT status FROM recruitments WHERE citizen_id = $1', [id])
);

module.exports = Recruitment;
