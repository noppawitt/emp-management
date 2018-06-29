const TakeExam = require('../models/TakeExam');

exports.fetchSomething = (req, res, next) => {
  TakeExam.fetchSomething()
    .then((anotherThing) => {
      res.json(anotherThing);
    })
    .catch(next);
};
