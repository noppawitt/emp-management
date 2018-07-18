const SelfAssessment = require('../models/SelfAssessment')
const EmployeeInfo = require('../models/EmployeeInfo')
const mail = require('../mail');

exports.check = (req,res,next) => {
  console.log('check self');
  SelfAssessment.checkExist(req.query.id)
    .then( exist => {
      res.json(exist)
    })
    .catch(next);
};

exports.find = (req,res,next) => {
  SelfAssessment.findById(req.query.id)
    .then( selfInfo =>{
      res.json(selfInfo)
    })
    .catch(next);
};

exports.create = (req,res,next) => {
  const newSelfAssessment = req.body.selfAssessmentInfo;
  console.log('create self');
  SelfAssessment.insertSelfAssessment(newSelfAssessment, req.user.id)
    .then(()=>{
      SelfAssessment.checkExist(req.body.selfAssessmentInfo.employeeID)
        .then( exist => {
          res.json(exist)
        })
    })
    .catch(next);
}

exports.update = (req,res,next) => {
  const newSelfAssessment = req.body.selfAssessmentInfo;
  SelfAssessment.updateSelfAssessment(newSelfAssessment, req.user.id)
    .then(()=>{
      SelfAssessment.checkExist(req.body.selfAssessmentInfo.employeeID)
        .then( exist =>{
          res.json(exist)
        })
    })
    .catch(next);
}

exports.submit = (req,res,next) => {
  EmployeeInfo.findAllByUserId(req.user.id)
  .then((empInfo) => {
    const mailOptions = {
      from: 'i.plas.sa.tic@gmail.com',
      to: 'ruby.pwn@hotmail.com',
      subject: 'Probation',
      html:
        `
          <p>SelfAssessment of ${empInfo.firstName} ${empInfo.lastName} already submitted</p>
        `
    };
    mail.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(info);
      }
    });
  })
  console.log(req.user.id);
  SelfAssessment.submitSelfAssessment(req.user.id)
    .then(()=>{
      SelfAssessment.checkExist(req.user.id)
        .then( exist =>{
          res.json(exist)
        })
    })
    .catch(next);
}
