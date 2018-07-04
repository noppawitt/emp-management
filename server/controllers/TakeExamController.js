const TakeExam = require('../models/TakeExam');

exports.fetchAllExam = (req, res, next) => {
  TakeExam.fetchAllExam()
    .then((examList) => {
      res.json(examList);
    })
    .catch(next);
};

exports.updateAnswer = (req, res, next) => {
  const object = req.body;
  console.log(object);
  TakeExam.findUploadedAnswer(object.id, 'existing check')
    .then((isExist) => {
      // if no old answer exist so create it first
      if (!isExist) {
        console.log('CREATE!!!', object.category);
        TakeExam.createBufferAnswer(object.id, object.category, object.answerList, new Date())
          .then((result) => {
            console.log('Create result', result);
          })
          .catch(next);
      }
      // after we make sure it exist update it
      TakeExam.updateAnswer(object.id, object.category, object.answerList)
        .then((result) => {
          console.log('Update result:', result);
        })
        .catch(next);
      // after we have already update it
      // send result of update back
      TakeExam.findUploadedAnswer(object.id, 'progress check')
        .then((progress) => {
          console.log('Progress', progress);
          res.json(progress);
        })
        .catch(next);
    })
    .catch(next);
};
