const LeaveRequest = require('../models/LeaveRequest');
const Holiday = require('../models/Holiday');
const moment = require('moment');
const mail = require('../mail');

const isHoliday = (holidays, date) => {
  for (let i = 0; i < holidays.length; i += 1) {
    if (moment(holidays[i].date) === date) {
      return true;
    }
  }
  return false;
};

const createLeaveRequest = (newLeaveRequest, holidays, id) => new Promise((resolve, reject) => {
  try {
    for (let m = moment(newLeaveRequest.leaveFrom); m.diff(newLeaveRequest.leaveTo, 'days') <= 0; m.add(1, 'days')) {
      if (m.isoWeekday() !== 6 && m.isoWeekday() !== 7) {
        if (!isHoliday(holidays, m)) {
          newLeaveRequest.leaveDate = m;
          newLeaveRequest.totalhours = moment(newLeaveRequest.endTime, 'HH:mm:ss').diff(moment(newLeaveRequest.startTime, 'HH:mm:ss'), 'hours');
          newLeaveRequest.code = 'playtorium';
          LeaveRequest.create(newLeaveRequest, id);
        }
      }
    }
    resolve('Create Finish!');
  }
  catch (error) {
    reject(error);
  }
});

exports.create = (req, res, next) => {
  const newLeaveRequest = req.body.leaveRequest;
  const holidays = Holiday.findByYear(moment().format('YYYY'));
  createLeaveRequest(newLeaveRequest, holidays, req.user.id)
    .then(() => {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: 'tmarks.thanapon@gmail.com',
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
      res.json('Create Finish!');
    });
};

const updateLeave = (leaveRequestArray, id) => new Promise((resolve, reject) => {
  try {
    for (let i = 0; i < leaveRequestArray.length; i += 1) {
      const leaveRequests = LeaveRequest.findByLeave(leaveRequestArray[i].leaveFrom, leaveRequestArray[i].leaveTo, leaveRequestArray.userId);
      for (let j = 0; j < leaveRequests.length; j += 1) {
        leaveRequests[j].status = leaveRequestArray[i].status;
        LeaveRequest.update(leaveRequests[j], id);
      }
    }
    resolve('Update Finish!');
  }
  catch (error) {
    reject(error);
  }
});

exports.update = (req, res, next) => {
  const leaveRequestArray = req.body;
  updateLeave(leaveRequestArray, req.user.id)
    .then(() => {
      res.json('Update Finish!');
    })
    .catch(next);
};

exports.findLeaveRequest = (req, res, next) => {
  if (req.query.month && req.query.year && req.query.userId) {
    LeaveRequest.findByYearAndMonth(req.query.year, req.query.month, req.query.userId)
      .then((leaveRequests) => {
        res.json(leaveRequests);
      })
      .catch(next);
  }
  else if (req.query.userId) {
    LeaveRequest.findByUserId(req.query.userId)
      .then((leaveRequests) => {
        res.json(leaveRequests);
      })
      .catch(next);
  }
};

exports.findAll = (req, res, next) => {
  LeaveRequest.findAll()
    .then((leaveRequests) => {
      res.json(leaveRequests);
    })
    .catch(next);
};
