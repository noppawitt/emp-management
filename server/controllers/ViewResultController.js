const ViewResult = require('../models/ViewResult');

exports.grading = (req, res, next) => {
  // fetch a random-ed id list
  ViewResult.fetchRandomExIdList(req.body.id, req.body.testDate)
    .then((object) => {
      // send random-ed list to get an exam list
      ViewResult.fetchExamSpecifyId(object.randomExIdList)
        .then((examQuery) => {
          // console.log('EXAM QUERY:', examQuery);
          // fetch candidate answer
          ViewResult.fetchCandidateAnswer(req.body.id, req.body.testDate)
            .then((answerQuery) => {
              const resultList = [];
              console.log('Ans Qry:', answerQuery);
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
                      test_date: req.body.testDate,
                      ex_question: eachExam.exQuestion,
                      ex_choices: eachExam.exType === 'Choices' ? eachExam.exChoice : [],
                      cd_answer: answerTemp,
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

exports.fetchExam = (req, res, next) => {
  ViewResult.fetchExam(req.body.id, req.body.testDate)
    .then((exam) => {
      res.json(exam);
    })
    .catch(next);
};
