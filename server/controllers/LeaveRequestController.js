const LeaveRequest = require('../models/LeaveRequest');
const Holiday = require('../models/Holiday');

const moment = require('moment');

exports.create = (req, res, next) => {
  const newLeaveRequest = req.body.leaveRequest;
  const holiday = Holiday.findByYear(moment().format('YYYY'));
  for (let m = moment(newLeaveRequest.leaveFrom); m.diff(newLeaveRequest.leaveTo, 'days') <= 0; m.add(1, 'days')) {
    if (m.isoWeekday() !== 6 && m.isoWeekday() !== 7) {
      for (let i = 0; i < holiday.length; i += 1) {
        if (moment(holiday[i].date) === m) {
          break;
        }
      }
      newLeaveRequest.leaveDate = m;
      newLeaveRequest.totalhours = moment(newLeaveRequest.endTime, 'HH:mm:ss').diff(moment(newLeaveRequest.startTime, 'HH:mm:ss'), 'hours');
      newLeaveRequest.code = 'playtorium';
      LeaveRequest.create(newLeaveRequest, req.user.id)
        .then((createdLeaveRequest) => {
          res.json(createdLeaveRequest);
        })
        .catch(next);
    }
  }
};

exports.update = (req, res, next) => {
  const editLeaveRequestArray = req.body.leaveRequests;
  editLeaveRequestArray.forEach((leaveRequest) => {
    const editLeaveRequest = {};
    editLeaveRequest.status = leaveRequest.status;
    editLeaveRequest.leaveFrom = leaveRequest.leaveFrom;
    editLeaveRequest.leaveTo = leaveRequest.leaveTo;
    editLeaveRequest.userId = leaveRequest.userId;
    LeaveRequest.update(editLeaveRequest, req.user.id)
      .then((updatedLeaveRequest) => {
        res.json(updatedLeaveRequest);
      })
      .catch(next);
  });
};

exports.findByUserId = (req, res, next) => {
  LeaveRequest.findByUserId(req.user.id)
    .then((leaveRequests) => {
      res.json(leaveRequests);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  LeaveRequest.findAll()
    .then((leaveRequests) => {
      res.json(leaveRequests);
    })
    .catch(next);
};
