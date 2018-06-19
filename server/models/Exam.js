const db = require('../db');

const Exam = {};

Exam.create = (exam) => {
  sendChoice = [];
  sendAnswer = [];
  examType = (exam.examType).toLowerCase();
  question = exam.question.replace(/\r?\n/g, '<br />');

  if (exam.answerType === 'Write-Up') {
    sendChoice.push('-');
    sendAnswer.push('-');
  }
  else {
    exam.choices.forEach(element => {
      sendChoice.push(element.data);
      if (element.answer === true) {
        sendAnswer.push(element.data);
      }
    });
  }

  return db.one(
    'INSERT INTO exams (ex_type, ex_question, ex_choices, ex_answer) VALUES ($1, $2, $3, $4) RETURNING 1',
    [exam.examType,
    question,
    sendChoice,
    sendAnswer]
  )
};

Exam.findAll = () => (
  db.manyOrNone('SELECT * FROM exams ORDER BY ex_id ASC', ['Pending'])
);

module.exports = Exam;