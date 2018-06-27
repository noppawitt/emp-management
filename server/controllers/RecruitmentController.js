const Recruitment = require('../models/Recruitment');

exports.fetchAllRecruitment = (req, res, next) => {
  Recruitment.fetchAllRecruitment()
    .then((recruitments) => {
      res.json(recruitments);
    })
    .catch(next);
};

exports.checkPasswordStatus = (req, res, next) => {
  const newCid = req.query.cid;
  Recruitment.checkPasswordStatus(newCid)
    .then((passwordStatusObject) => {
      res.json(passwordStatusObject);
    })
    .catch(next);
};

exports.assignNewPassword = (req, res, next) => {
  const newCid = req.query.cid;
  const newLifetimes = req.query.lifetimes;
  const newPassword = Math.random().toString(36).slice(-8);
  Recruitment.assignNewPassword(newCid, newPassword, newLifetimes)
    .then((passwordStatusObject) => {
      res.json(passwordStatusObject);
    })
    .catch(next);
};
