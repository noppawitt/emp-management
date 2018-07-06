const LeaveHistory = require('../models/LeaveHistory');

exports.findByUserIdAndYear = (req, res, next) => {
  LeaveHistory.findByUserIdAndYear(req.query.userId, req.query.year)
    .then((leaveHistory) => {
      res.json(leaveHistory);
    })
    .catch(next);
};
