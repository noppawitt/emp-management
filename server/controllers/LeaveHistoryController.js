const LeaveHistory = require('../models/LeaveHistory');

exports.findByUserIdAndYear = (req, res, next) => {
  if (req.accessControl.leaveHistoryViewAll) {
    LeaveHistory.findByUserIdAndYear(req.query.userId, req.query.year)
      .then((leaveHistory) => {
        res.json(leaveHistory);
      })
      .catch(next);
  }
  else if (req.accessControl.leaveHistoryViewOwn) {
    if (parseInt(req.query.userId, 10) === req.user.id) {
      LeaveHistory.findByUserIdAndYear(req.query.userId, req.query.year)
        .then((leaveHistory) => {
          res.json(leaveHistory);
        })
        .catch(next);
    }
    else {
      res.status(401).json({
        message: `You don't have permission to do this.`
      });
    }
  }
};
