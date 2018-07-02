const db = require('../db');

const TakeExam = {};

TakeExam.fetchAllExam = () => (
  db.manyOrNone('SELECT * FROM exams')
);

module.exports = TakeExam;
