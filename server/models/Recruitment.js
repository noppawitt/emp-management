const db = require('../db');

const Recruitment = {};

Recruitment.fetchAllRecruitment = () => (
  db.manyOrNone('SELECT * FROM recruitments')
);

Recruitment.checkPasswordStatus = id => (
  db.oneOrNone('SELECT id, birthdate, lastest_activated_password_time, activation_lifetimes FROM exam_users WHERE id = $1', [id])
);

Recruitment.activatePassword = (id, lifetimes) => (
  db.oneOrNone('UPDATE exam_users SET activation_lifetimes = $2 where id = $1', [id, lifetimes])
  // .then(db.oneOrNone('SELECT id, birthdate, lastest_activated_password_time, activation_lifetimes FROM exam_users WHERE id = $1', [cid]))
);

module.exports = Recruitment;
