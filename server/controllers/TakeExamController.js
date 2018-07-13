const TakeExam = require('../models/TakeExam');

exports.fetchEPRList = (req, res, next) => {
  TakeExam.fetchEPRList(req.query.id)
    .then((EPRList) => {
      res.json(EPRList);
    })
    .catch(next);
};

exports.fetchExamId = (req, res, next) => {
  TakeExam.fetchExamId()
    .then((ExamIdObject) => {
      res.json(ExamIdObject);
    })
    .catch(next);
};

exports.fetchRandomExIdList = (req, res, next) => {
  TakeExam.fetchRandomExIdList(req.query.id)
    .then((List) => {
      res.json(List);
    })
    .catch(next);
};

exports.fetchExamSpecifyId = (req, res, next) => {
  const rawIdList = req.body.idList;
  TakeExam.fetchExamSpecifyId(rawIdList.randomExIdList)
    .then((examList) => {
      res.json(examList);
    })
    .catch(next);
};

exports.updateAnswer = (req, res, next) => {
  console.log('????', req.body);
  const object = req.body;
  TakeExam.findUploadedAnswer(object.id, 'existing check', object.testDate)
    .then((isExist) => {
      // if no old answer exist so create it first
      if (!isExist) {
        TakeExam.createBufferAnswer(object.id, object.answerList, object.testDate)
          .then(() => { })
          .catch(next);
      }
      // after we make sure it exist update it
      TakeExam.updateAnswer(object.id, object.answerList, new Date(), object.testDate)
        .then((result) => {
          if (result === null) res.json('Update Complete');
          else res.json('Something wrong :'.concat(result));
        })
        .catch(next);
    })
    .catch(next);
};

exports.findUploadedAnswer = (req, res, next) => {
  const object = req.body;
  TakeExam.findUploadedAnswer(object.id, 'progress check', object.testDate.toString())
    .then((result) => {
      // if result null > not exist > create it 1st
      // initialize answerList with empty list
      if (!result) {
        TakeExam.createBufferAnswer(object.id, [], object.testDate)
          .then((createresult) => {
            res.json(createresult);
          })
          .catch(next);
      }
      else res.json(result);
    })
    .catch(next);
};

exports.updateStartTime = (req, res, next) => {
  console.log('????', req.body);
  TakeExam.updateStartTime(req.body.startTime, req.body.id, req.body.testDate)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
};

exports.updateSubmittedTime = (req, res, next) => {
  console.log('????', req.body);
  TakeExam.updateSubmittedTime(req.body.id, req.body.time, req.body.testDate)
    .then((retval) => {
      res.json(retval);
    })
    .catch(next);
};

exports.deActivate = (req, res, next) => {
  if (req.body.status !== 'deactive') {
    res.json('deactive status: not deactive type!');
  }
  else {
    TakeExam.changeStatus(req.body.id, 'Wait for Grading')
      .then(() => {
        TakeExam.expiredActivationLifetime(req.body.id)
          .then((retval) => {
            res.json('deactive status: '.concat(retval === null ? 'OK' : 'Something wrong'));
          })
          .catch(next);
      })
      .catch(next);
  }
};

exports.getTestDate = (req, res, next) => {
  TakeExam.getTestDate(req.query.id)
    .then((testDate) => {
      res.json(testDate.appointment);
    })
    .catch(next);
};
