const Recruitment = require('../models/Recruitment');

exports.fetchAllRecruitment = (req, res, next) => {
  Recruitment.fetchAllRecruitment()
    .then((recruitments) => {
      res.json(recruitments);
    })
    .catch(next);
};

exports.checkPasswordStatus = (req, res, next) => {
  const newid = req.query.id;
  Recruitment.checkPasswordStatus(newid)
    .then((passwordStatusObject) => {
      res.json(passwordStatusObject);
    })
    .catch(next);
};

exports.activatePassword = (req, res, next) => {
  console.log('here pls');
  const theid = req.query.id;
  const newLifetimes = req.query.lifetimes < 1 ? 0 : req.query.lifetimes;
  Recruitment.activatePassword(theid, newLifetimes)
    .then((messege) => {
      res.json(messege);
    })
    .catch(next);
};
