const Performance = require('../models/Performance');
const mail = require('../mail');

exports.check = (req,res,next) => {
  Performance.checkExist(req.query.id)
    .then((exist)=>{
      console.log(exist)
      res.json(exist);
    })
    .catch(next);
};

exports.find = (req,res,next) => {
  Performance.findById(req.query.id,req.query.year)
    .then((performance) => {
        res.json(performance);
    })
    .catch(next);
};

exports.create = (req,res,next) => {
  const newPerformanceInfo = req.body.performanceInfo;
  Performance.insertPerformance(newPerformanceInfo, req.user.id)
    .then(() => {
        Performance.checkExist(req.body.performanceInfo.employeeID)
          .then((performances)=>{
            if(performances[0].supSignDate!=null && performances[0].mdSignDate == null){
              performanceMailer(req);
            }
            res.json(performances)
          });
    })
    .catch(next);
};

exports.update = (req,res,next) => {
    const newPerformanceInfo = req.body.performanceInfo;
    Performance.updatePerformance(newPerformanceInfo, req.user.id)
      .then(() => {
        Performance.checkExist(req.body.performanceInfo.employeeID)
          .then((performances)=>{
            if(performances[0].supSignDate!=null && performances[0].mdSignDate == null){
              performanceMailer(req);
            }
            res.json(performances)
          });
      })
      .catch(next);
};

const performanceMailer = (req) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'ruby.pwn@hotmail.com',
    subject: 'Performance',
    html:
      `
        <p>Performance of ${req.body.performanceInfo.name} already sumitted</p>
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