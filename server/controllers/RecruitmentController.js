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
      console.log(passwordStatusObject);
      res.json(passwordStatusObject);
    })
    .catch(next);
};

exports.activatePassword = (req, res, next) => {
  Recruitment.activatePassword(req.query.id, req.query.lifetimes < 1 ? 0 : req.query.lifetimes, new Date())
    .then((message) => {
      res.json(message);
    })
    .catch(next);
};

exports.uploadRandomExIdList = (req, res, next) => {
  const randomExIdList = [];
  Object(req.body.randomExIdList).map(item => (
    item.exIdList.map(sublist => (
      randomExIdList.push(sublist)
    ))
  ));
  Recruitment.uploadRandomExIdList(randomExIdList, req.body.id)
    .then((ok) => {
      console.log(ok);
      res.json(ok);
    })
    .catch(next);
};
