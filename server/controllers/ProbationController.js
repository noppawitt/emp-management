const Probation = require('../models/Probation');
const mail = require('../mail');

exports.find = (req, res, next) => {
    console.log('probation running')
    Probation.findProById(req.query.id)
        .then((users) => {
            res.json(users);
        })
        .catch(next);
};

exports.create = (req,res,next) => {
  const mailOptions = {
    from: 'i.plas.sa.tic@gmail.com',
    to: 'ruby.pwn@hotmail.com',
    subject: 'Hello',
    html: `<p>Good Morning</p>`
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

exports.update = (req,res,next) => {
  console.log('update probation');
  const newProbationInfo = req.body.probationInfo;
  Probation.updateProbation(newProbationInfo, req.user.id)
    .then(() => {
      console.log("Test Probation");
      Probation.findProById(req.body.probationInfo.employeeID)
        .then((probation)=>{
          res.json(probation)
        });
    })
    .catch(next);
};
