const ViewResult = require('../models/ViewResult');

exports.findByUserId = (req, res, next) => {
  ViewResult.findByUserId(req.user.id)
    .then((results) => {
      res.json(results);
    })
    .catch(next);
};

exports.grading = (req, res, next) => {
  // fetch a random-ed id list
  ViewResult.fetchRandomExIdList(req.query.id)
    .then((object) => {
      // send random-ed list to get an exam list
      ViewResult.fetchExamSpecifyId(object.randomExIdList)
        .then((examQuery) => {
          // console.log('EXAM QUERY:', examQuery);
          // fetch candidate answer
          ViewResult.fetchCandidateAnswer(req.query.id)
            .then((answerQuery) => {
              const resultList = [];
              // foreach exId let compare the answer
              object.randomExIdList.map((exId) => {
                Object(examQuery).map((eachExam) => {
                  if (eachExam.exId === exId) {
                    let correctCount = 0;
                    const answerTemp = [];
                    Object(answerQuery[0].answerList).map((eachAnswerList) => {
                      // console.log('???>>>???<<<???', answerQuery[0]);
                      answerTemp.push(JSON.parse(eachAnswerList).answer);
                      if (JSON.parse(eachAnswerList).question === exId) {
                        const tempAnswerList = JSON.parse(eachAnswerList).answer === '' ? [] : JSON.parse(eachAnswerList).answer;
                        tempAnswerList.map((eachAnswer) => {
                          // if candidate's answer is in solve count it!
                          if (eachExam.exAnswer.includes(eachAnswer)) correctCount += 1;
                        });
                      }
                    });
                    let point = [0, 0];
                    let status;
                    // in case of 1 coorect answer,
                    // point is correctCount(0 or 1) / 1 that is itself
                    // &
                    // in case of many correct ones,
                    // point is depend on ration of correctCount and amount of correct answer
                    if (eachExam.exType === 'Choices') {
                      point = [correctCount, eachExam.exAnswerLength];
                      status = 'Graded';
                    }
                    else if (eachExam.exType === 'Write-Up') {
                      point = ['UNKNOWN', 'UNKNOWN'];
                      status = 'Wait for grading';
                    }
                    // feature in the future
                    // multi style on multi choices type exam
                    // pickable : correct : all
                    // if 'Choices - one:one:many':
                    // if 'Choices - some:many:many':
                    // if 'Choices - some:some:many':
                    resultList.push({
                      ex_id: exId,
                      cd_id: answerQuery[0].id,
                      test_date: answerQuery[0].testDate,
                      ex_question: eachExam.exQuestion,
                      ex_choices: eachExam.exType === 'Choices' ? eachExam.exChoice : [],
                      ex_answer: answerTemp,
                      ex_correct: eachExam.exAnswer,
                      ex_type: eachExam.exType,
                      point,
                      status,
                    });
                  }
                });
              });
              console.log('ResultList', resultList);
              ViewResult.uploadResult(resultList)
                .then((returnStatus) => {
                  res.json(returnStatus);
                })
                .catch(next);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.fetchUngradedExam = (req, res, next) => {
  ViewResult.fetchUngradedExam(req.query.id)
    .then((ungradedExam) => {
      res.json(ungradedExam);
    })
    .catch(next);
};
