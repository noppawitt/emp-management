const Timesheet = require('../models/Timesheet');

exports.create = (req, res, next) => {
  const newTimesheet = req.body.timesheet;
  Timesheet.create(newTimesheet, req.user.id)
    .then((createdTimesheet) => {
      res.json(createdTimesheet);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editTimesheet = req.body.timesheet;
  Timesheet.update(editTimesheet, req.user.id)
    .then((updatedTimesheet) => {
      req.json(updatedTimesheet);
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  Timesheet.findByUserId(req.user.id)
    .then((timesheets) => {
      res.json(timesheets);
    })
    .catch(next);
};
