const db = require('../db');

const Exam = {};

const setFormatToDB = (exam) => {
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

  return { sendChoice: sendChoice, sendAnswer: sendAnswer, examType: examType, question: question };
}

Exam.create = (exam) => {
  examFormatDB = setFormatToDB(exam);

  return db.one(
    'INSERT INTO exams (ex_type, ex_question, ex_choices, ex_answer) VALUES ($1, $2, $3, $4) RETURNING 1',
    [examFormatDB.examType,
    examFormatDB.question,
    examFormatDB.sendChoice,
    examFormatDB.sendAnswer]
  )
};

Exam.findAll = () => (
  db.manyOrNone('SELECT * FROM exams ORDER BY ex_id ASC', ['Pending'])
);

Exam.delete = id => (
  db.none('DELETE FROM exams WHERE ex_id = $1', [parseInt(id.id)])
);

Exam.edit = (exam) => {
  examFormatDB = setFormatToDB(exam);
  return db.none(
    'UPDATE exams SET ex_type = $1, ex_question = $2, ex_choices = $3, ex_answer = $4 WHERE ex_id = $5',
    [examFormatDB.examType,
    examFormatDB.question,
    examFormatDB.sendChoice,
    examFormatDB.sendAnswer,
    exam.examId]
  )
};

module.exports = Exam;