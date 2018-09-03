const Level = require('../models/Level');

exports.create = (req, res, next) => {
  const newLevel = req.body.level;
  Level.create(newLevel, req.user.id)
    .then((result) => {
      Level.findById(result.id)
        .then((level) => {
          res.json(level);
        })
        .catch(next);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editLevel = req.body.level;
  Level.update(editLevel, req.user.id)
    .then((updatedLevel) => {
      res.json(updatedLevel);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Level.findAll()
    .then((levels) => {
      res.json(levels);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  Level.delete(req.body.id)
    .then(() => {
      Level.findAll()
        .then((levels) => {
          res.json(levels);
        })
        .catch(next);
    })
    .catch(next);
};
