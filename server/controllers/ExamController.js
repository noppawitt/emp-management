const Exam = require('../models/Exam');

exports.create = (req, res, next) => {
  const newExam = req.body.exam;

  Exam.create(newExam)
    .then((addExam) => {
      res.json(addExam);
    })
    .catch(next);
}