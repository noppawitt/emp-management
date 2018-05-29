const LeaveRequest = require('../models/LeaveRequest');
const Holiday = require('../models/Holiday');

const moment = require('moment');

exports.create = (req, res, next) => {
  const newLeaveRequest = req.body.leaveRequest;
  const holiday = Holiday.findByYear(moment().format('YYYY'));
  for (let m = moment(newLeaveRequest.leaveFrom); m.isBefore(newLeaveRequest.leaveTo + 1); m.add(1, 'days')) {
    if (m.isoWeekday() !== 6 && m.isoWeekday() !== 7) {
      for (let i = 0; i < holiday.length; i += 1) {
        if (moment(holiday[i].date) === m) {
          break;
        }
      }
      newLeaveRequest.leaveDate = m;
      newLeaveRequest.totalhours = newLeaveRequest.endTime.diff(newLeaveRequest.startTime, 'hours');
      LeaveRequest.create(newLeaveRequest, req.user.id)
        .then((createdLeaveRequest) => {
          res.json(createdLeaveRequest);
        })
        .catch(next);
    }
  }
};

exports.update = (req, res, next) => {
  const editLeaveRequest = req.body.leaveRequest;
  LeaveRequest.update(editLeaveRequest, req.user.id)
    .then((updatedLeaveRequest) => {
      res.json(updatedLeaveRequest);
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  LeaveRequest.findByUserId(req.user.id)
    .then((leaveRequests) => {
      res.json(leaveRequests);
    })
    .catch(next);
};
