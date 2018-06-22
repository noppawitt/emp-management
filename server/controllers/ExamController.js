const Exam = require('../models/Exam');

exports.create = (req, res, next) => {
  const newExam = req.body.exam;

  Exam.create(newExam)
    .then((addExam) => {
      res.json(addExam);
    })
    .catch(next);
}

exports.findAll = (req, res, next) => {
  Exam.findAll()
    .then((exam) => {
      res.json(exam);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  Exam.delete(req.body.id)
    .then(() => {
      Exam.findAll()
        .then((exams) => {
          res.json(exams);
        })
        .catch(next);
    })
    .catch(next);
};

exports.edit = (req, res, next) => {
  Exam.edit(req.body.form)
    .then(() => {
      Exam.findAll()
        .then((exams) => {
          res.json(exams);
        })
        .catch(next);
    })
    .catch(next);
}
