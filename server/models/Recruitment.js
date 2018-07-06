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
  // .then(db.oneOrNone('SELECT id, birthdate, lastest_activated_password_time, activation_lifetimes FROM exam_users WHERE id = $1', [cid]))
);

Recruitment.uploadRandomExIdList = (randomExIdList, id) => {
  console.log('test');
  console.log(randomExIdList);
  return db.oneOrNone('UPDATE exam_users2 SET random_ex_id_list = $1 WHERE id = $2', [randomExIdList, id]);
};

module.exports = Recruitment;
