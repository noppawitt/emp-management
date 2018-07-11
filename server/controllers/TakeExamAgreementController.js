const jwt = require('jsonwebtoken');
const TakeExamAgreement = require('../models/TakeExamAgreement');

const jwtSecret = process.env.JWT_SECRET;

exports.acceptAgreement = (req, res, next) => {
  TakeExamAgreement.acceptAgreement(req.body.id, req.body.testdate)
    .then((value) => {
      const newToken = jwt.sign({
        id: req.body.id,
        agreementStatus: 'Read',
        testdate: req.body.testDate,
      }, jwtSecret);
      res.json({
        id: req.body.id,
        newToken,
        agreementStatus: 'Read',
        testdate: req.body.testDate,
      });
    })
    .catch(next);
};