const db = require('../db');

const Recruitment = {};

Recruitment.fetchAllRecruitment = () => (
  db.manyOrNone('SELECT * FROM recruitments')
);

Recruitment.checkPasswordStatus = cid => (
  db.oneOrNone('SELECT user_id, password, lastest_created_password_time, password_lifetimes FROM exam_users WHERE user_id = $1', [cid])
);

Recruitment.generatePassword = (cid, newPassword, lifetimes) => (
  db.tx((transaction) => {
    console.log('www.google.co.th/', cid, newPassword, lifetimes);
    const q1 = transaction.oneOrNone(
      'UPDATE exam_users SET password = $1, password_lifetimes = $2 where user_id = $3',
      [newPassword, lifetimes, cid]
    );
    const q2 = transaction.oneOrNone('SELECT password, lastest_created_password_time, password_lifetimes FROM exam_users WHERE user_id = $1', [cid]);
    return transaction.batch([q1, q2]);
  })
);

module.exports = Recruitment;
