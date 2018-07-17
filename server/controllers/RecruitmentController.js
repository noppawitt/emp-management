const Recruitment = require('../models/Recruitment');
const moment = require('moment');

exports.fetchAllRecruitment = (req, res, next) => {
  Recruitment.fetchAllRecruitment()
    .then((recruitments) => {
      res.json(recruitments);
    })
    .catch(next);
};

exports.checkUserStatus = (req, res, next) => {
  Recruitment.checkExamUser(req.body.id, req.body.testDate)
    .then((retval) => {
      if (retval === null) {
        Recruitment.createExamUser(
          req.body.id,
          req.body.testDate,
          moment(),
          null,
          0,
          0,
          null,
          0,
        )
          .then()
          .catch(next);
      }
      Recruitment.checkUserStatus(req.body.id)
        .then((object) => {
          res.json(object);
        })
        .catch(next);
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

exports.activateUser = (req, res, next) => {
  console.log('???', req.body);
  Recruitment.checkExamUser(req.body.id, req.body.testDate)
    .then((retval) => {
      if (retval === null) {
        Recruitment.createExamUser(
          req.body.id,
          req.body.testDate,
          moment(),
          null,
          0,
          0,
          null,
          0,
        )
          .then()
          .catch(next);
      }
      Recruitment.activateUser(
        req.body.id,
        req.body.lifetimes < 1 ? 0 : req.body.lifetimes,
        req.body.lifetimes < 1 ? null : req.body.testDate,
      )
        .then((message) => {
          console.log('??', message);
          res.json(message);
        })
        .catch(next);
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
      res.json(ok);
    })
    .catch(next);
};

// Recruitment : View Result part

exports.fetchGradingExam = (req, res, next) => {
  Recruitment.fetchGradingExam(req.body.id, req.body.testDate)
    .then((exam) => {
      res.json(exam);
    })
    .catch(next);
};

exports.changeStatus = (req, res, next) => {
  Recruitment.changeStatus(req.body.id, req.body.status)
    .then(() => {
      Recruitment.checkStatus(req.body.id)
        .then((object) => {
          res.json(object.status === req.body.status ? 'OK' : 'Something Wrong');
        })
        .catch(next);
    })
    .catch(next);
};
