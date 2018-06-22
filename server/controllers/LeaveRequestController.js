const LeaveRequest = require('../models/LeaveRequest');
const Holiday = require('../models/Holiday');
const moment = require('moment');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  secure: true
}));

const isHoliday = (holidays, date) => {
  for (let i = 0; i < holidays.length; i += 1) {
    if (moment(holidays[i].date) === date) {
      return true;
    }
  }
  return false;
};

exports.create = (req, res, next) => {
  const newLeaveRequest = req.body.leaveRequest;
  const holidays = Holiday.findByYear(moment().format('YYYY'));
  for (let m = moment(newLeaveRequest.leaveFrom); m.diff(newLeaveRequest.leaveTo, 'days') <= 0; m.add(1, 'days')) {
    if (m.isoWeekday() !== 6 && m.isoWeekday() !== 7) {
      if (!isHoliday(holidays, m)) {
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
  }
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'tmarks.thanapon@gmail.com',
    subject: 'Hello',
    html: `<p>Good Morning</p>`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(info);
    }
  });
};

const updateLeave = leaveRequestArray => new Promise((resolve, reject) => {
  try {
    for (let i = 0; i < leaveRequestArray.length; i += 1) {
      const leaveRequests = LeaveRequest.findByLeave(leaveRequestArray[i].leaveFrom, leaveRequestArray[i].leaveTo, leaveRequestArray.userId);
      for (let j = 0; j < leaveRequests.length; j += 1) {
        leaveRequests[j].status = leaveRequestArray[i].status;
        LeaveRequest.update(leaveRequests[j]);
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
  updateLeave(leaveRequestArray)
    .then(() => {
      res.json('Update Finish!');
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

exports.findAll = (req, res, next) => {
  LeaveRequest.findAll()
    .then((leaveRequests) => {
      res.json(leaveRequests);
    })
    .catch(next);
};
