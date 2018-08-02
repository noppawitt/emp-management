const Educate = require('../models/Educate');

exports.create = (req, res, next) => {
  const newEducate = req.body.educate;
  Educate.create(newEducate, req.user.id)
    .then(() => {
      Educate.findByUserId(newEducate.userId)
        .then((educates) => {
          res.json(educates);
        });
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editEducate = req.body.educate;
  Educate.update(editEducate, req.user.id)
    .then(() => Educate.findByUserId(req.query.userId))
    .then(educates => res.json(educates))
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  Educate.findByUserId(req.query.userId)
    .then((educates) => {
      res.json(educates);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  Educate.delete(req.body.id)
    .then(() => {
      Educate.findByUserId(req.query.userId)
        .then((educates) => {
          res.json(educates);
        })
        .catch(next);
    })
    .catch(next);
};
