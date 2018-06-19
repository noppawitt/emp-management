const db = require('../db');

const Exam = {};

Exam.create = (exam) => {
  sendChoices = '';
  sendAnswer = '';
  splitSymbol = '!~SPLIT~!';
  hasAnswer = false;
  question = exam.question.replace(/\r?\n/g, '<br />');

  if (exam.answerType === 'Write-Up') {
    sendChoices = '-';
    sendAnswer = '-';
  }
  else {
    sendChoices = exam.choice1 + splitSymbol + exam.choice2;
    if (exam.numberOfChoices >= 3) {
      sendChoices += (splitSymbol + exam.choice3);
    }
    if (exam.numberOfChoices >= 4) {
      sendChoices += (splitSymbol + exam.choice4);
    }
    if (exam.numberOfChoices >= 5) {
      sendChoices += (splitSymbol + exam.choice5);
    }

    if (exam.ans1) {
      sendAnswer = exam.choice1;
      hasAnswer = true;
    }
    if (exam.ans2) {
      sendAnswer += (hasAnswer) ?(splitSymbol + exam.choice2) :exam.choice2;
      hasAnswer = true;
    }
    if (exam.ans3) {
      sendAnswer += (hasAnswer) ?(splitSymbol + exam.choice3) :exam.choice3;
      hasAnswer = true;
    }
    if (exam.ans4) {
      sendAnswer += (hasAnswer) ?(splitSymbol + exam.choice4) :exam.choice4;
      hasAnswer = true;
    }
    if (exam.ans5) {
      sendAnswer += (hasAnswer) ?(splitSymbol + exam.choice5) :exam.choice5;
      hasAnswer = true;
    }
  }

  return db.one(
    'INSERT INTO exams (ex_type, ex_question, ex_choices, ex_answer) VALUES ($1, $2, $3, $4) RETURNING 1',
    [exam.examType,
    question,
    sendChoices,
    sendAnswer]
  )
};

module.exports = Exam;