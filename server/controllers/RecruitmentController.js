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

exports.getTestDate = (req, res, next) => {
  Recruitment.getTestDate(req.query.id)
    .then((testDate) => {
      res.json(testDate.appointment);
    })
    .catch(next);
};

exports.activatePassword = (req, res, next) => {
  // function didn't handle if no user in exam_users2
  Recruitment.activatePassword(
    req.body.id,
    req.body.lifetimes < 1 ? 0 : req.body.lifetimes,
    req.body.lifetimes < 1 ? null : req.body.testDate,
  )
    .then((message) => {
      res.json(message);
    })
    .catch(next);
};

exports.uploadRandomExIdList = (req, res, next) => {
  const randomExIdList = [];
  Object(req.body.randomExIdList).map(item => (
    item.exIdList.map(sublist => (randomExIdList.push(sublist)))
  ));
  Recruitment.uploadRandomExIdList(randomExIdList, req.body.id, req.body.testDate)
    .then((ok) => {
      console.log('ok?');
      res.json(ok);
    })
    .catch(next);
};
