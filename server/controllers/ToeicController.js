const Toeic = require('../models/Toeic');

exports.create = (req, res, next) => {
  const newToeic = req.body.toeic;
  Toeic.create(newToeic, req.user.id)
    .then(() => {
      Toeic.findByUserId(req.query.userId)
        .then((toeics) => {
          res.json(toeics);
        })
        .catch(next);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  Toeic.delete(req.body.id)
    .then(() => {
      Toeic.findByUserId(req.query.userId)
        .then((toeics) => {
          res.json(toeics);
        })
        .catch(next);
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  Toeic.findByUserId(req.query.userId)
    .then((toeics) => {
      res.json(toeics);
    })
    .catch(next);
};
