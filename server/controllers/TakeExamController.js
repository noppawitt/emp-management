const TakeExam = require('../models/TakeExam');

exports.fetchAllExam = (req, res, next) => {
  TakeExam.fetchAllExam()
    .then((examObject) => {
      res.json(examObject);
    })
    .catch(next);
};
