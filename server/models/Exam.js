const db = require('../db');

const Exam = {};

Exam.create = (exam) => (
  db.one(
    'INSERT INTO exams (ex_type, ex_questionHTML, ex_choices, ex_answer)',
    [exam.type,
    exam.question,
    exam.choices,
    exam.answer]
  )
);