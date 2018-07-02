const Recruitment = require('../models/Recruitment');

exports.fetchAllRecruitment = (req, res, next) => {
  Recruitment.fetchAllRecruitment()
    .then((recruitments) => {
      res.json(recruitments);
    })
    .catch(next);
};

exports.checkPasswordStatus = (req, res, next) => {
  Recruitment.checkPasswordStatus(req.query.id)
    .then((passwordStatusObject) => {
      res.json(passwordStatusObject);
    })
    .catch(next);
};

exports.activatePassword = (req, res, next) => {
  Recruitment.activatePassword(req.query.id, req.query.lifetimes < 1 ? 0 : req.query.lifetimes)
    .then((messege) => {
      res.json(messege);
    })
    .catch(next);
};
