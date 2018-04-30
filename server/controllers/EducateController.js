const Educate = require('../models/Educate');

exports.create = (req, res, next) => {
  const newEducate = req.body.educate;
  Educate.create(newEducate, req.user.id)
    .then((createdEducate) => {
      res.json(createdEducate);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editEducate = req.body.educate;
  Educate.update(editEducate, req.user.id)
    .then((updatedEducate) => {
      res.json(updatedEducate);
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  Educate.findByUserId(req.user.id)
    .then((educates) => {
      res.json(educates);
    })
    .catch(next);
};
