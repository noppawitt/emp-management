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

exports.generatePassword = (req, res, next) => {
  const theCid = req.query.cid;
  let newPassword = (Math.random().toString(36)).slice(-8);
  let newLifetimes = req.query.lifetimes;
  if (newLifetimes < 1) {
    newPassword = null;
    newLifetimes = 0;
  }
  Recruitment.generatePassword(theCid, newPassword, newLifetimes)
    .then((messege) => {
      res.json(messege);
    })
    .catch(next);
};
