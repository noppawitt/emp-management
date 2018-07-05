const db = require('../db');

const TakeExam = {};

TakeExam.fetchAllExam = () => (
  db.many('SELECT * from exams')
);

TakeExam.createBufferAnswer = (id, category, answerList, date) => (
  db.oneOrNone(
    'INSERT INTO exam_candidate_submitted (id, category, answer_list, test_date) VALUES ($1, $2, $3, $4)',
    [id, category, answerList, date]
  )
);

TakeExam.findUploadedAnswer = (id, type) => {
  if (type === 'existing check') {
    return db.oneOrNone('SELECT 1 FROM exam_candidate_submitted WHERE id = $1', [id]);
  }
  else if (type === 'progress check') {
    return db.oneOrNone('SELECT * FROM exam_candidate_submitted WHERE id = $1', [id]);
  }
  return null;
};

TakeExam.updateAnswer = (id, category, answerList) => {
  console.log(id, '<<<');
  return db.oneOrNone('UPDATE exam_candidate_submitted SET (id, category, answer_list) = ($1, $2, $3)', [id, category, answerList]);
};

module.exports = TakeExam;
