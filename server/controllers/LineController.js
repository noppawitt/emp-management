const EmployeeInfo = require('../models/EmployeeInfo');

exports.createLineCode = (req, res, next) => {
  const newLineCode = req.body;
  EmployeeInfo.createLineCode(newLineCode.userId, newLineCode.lineCode, req.user.id)
    .then(() => {
      res.json('Create line code success!');
    })
    .catch(next);
};

exports.findUserInfo = (req, res, next) => {
  EmployeeInfo.findInfoAll()
    .then((employeeInfos) => {
      res.json(employeeInfos);
    })
    .catch(next);
};
