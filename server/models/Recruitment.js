const db = require('../db');

const Recruitment = {};

Recruitment.fetchAllRecruitment = () => (
  db.manyOrNone('SELECT * FROM recruitments')
);

Recruitment.checkUserStatus = id => (
  db.oneOrNone('SELECT id, latest_activated_time, activation_lifetimes FROM exam_users2 WHERE id = $1', [id])
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
Recruitment.fetchGradingExam = (id, testDate) => (
  db.manyOrNone('SELECT * FROM exam_result WHERE cd_id = $1 AND test_date = $2', [id, testDate])
);

Recruitment.changeStatus = (id, status) => (
  db.oneOrNone('UPDATE recruitments SET status = $2 WHERE citizen_id = $1', [id, status])
);

Recruitment.checkStatus = id => (
  db.oneOrNone('SELECT status FROM recruitments WHERE citizen_id = $1', [id])
);

module.exports = Recruitment;
