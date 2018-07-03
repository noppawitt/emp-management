const WorkExperience = require('../models/WorkExperience');

exports.create = (req, res, next) => {
  const newWorkExperience = req.body.workExperience;
  WorkExperience.create(newWorkExperience, req.user.id)
    .then(() => {
      res.end();
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  WorkExperience.delete(req.body.id)
    .then(() => {
      res.end();
    })
    .catch(next);
};
