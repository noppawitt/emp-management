const Probation = require('../models/Probation');
const mail = require('../mail');

exports.check = (req,res,next) => {
  Probation.checkExist(req.query.id)
    .then((exist)=>{
      console.log(exist);
      res.json(exist);
    })
    .catch(next);
};

exports.find = (req, res, next) => {
    Probation.findProById(req.query.id,req.query.proId)
        .then((users) => {
            res.json(users);
        })
        .catch(next);
};

exports.create = (req,res,next) => {
  const newProbationInfo = req.body.probationInfo;
  Probation.insertProbation(newProbationInfo, req.user.id)
    .then(() => {
        Probation.checkExist(req.body.probationInfo.employeeID)
          .then((probations)=>{
            if(probations[0].supSignDate!=null && probations[0].mdSignDate == null){
              probationMailer(req);
            }
            res.json(probations)
          });
    })
    .catch(next);
};

exports.update = (req,res,next) => {
  const newProbationInfo = req.body.probationInfo;
  if(req.body.probationInfo.supervisorSignDate != null){
    
  }
  Probation.updateProbation(newProbationInfo, req.user.id)
    .then(() => {
      Probation.checkExist(req.body.probationInfo.employeeID)
        .then((probations)=>{
          if(probations[0].supSignDate!=null && probations[0].mdSignDate == null){
            probationMailer(req);
          }
          res.json(probations)
        });
    })
    .catch(next);
};

const probationMailer = (req) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'ruby.pwn@hotmail.com',
    subject: 'Probation',
    html:
      `
        <p>Probation of ${req.body.probationInfo.name} already sumitted</p>
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
};