const db = require('../db');

const Recruitment = {};

Recruitment.fetchAllRecruitment = () => (
  db.manyOrNone('SELECT * FROM recruitments')
);

module.exports = Recruitment;