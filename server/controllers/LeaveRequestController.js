const LeaveRequest = require('../models/LeaveRequest');
const Holiday = require('../models/Holiday');
const LeaveHistory = require('../models/LeaveHistory');
const moment = require('moment');
const mail = require('../mail');
const hash = require('object-hash');

const calTotalHours = (timeIn, timeOut) => new Promise((resolve, reject) => {
  try {
    switch (timeIn) {
      case '12:30':
        timeIn = '13:00';
        break;
      case '18:30':
        timeIn = '19:00';
        break;
      default:
        break;
    }
    switch (timeOut) {
      case '12:30':
        timeOut = '12:00';
        break;
      case '18:30':
        timeOut = '18:00';
        break;
      default:
        break;
    }
    let totalhours = 0;
    const startTime = moment.duration(timeIn, 'HH:mm');
    const endTime = moment.duration(timeOut, 'HH:mm');
    const timeInHour = moment(timeIn, 'HH:mm').hour();
    const timeOutHour = moment(timeOut, 'HH:mm').hour();
    const diff = endTime.subtract(startTime);
    const min = (diff.minutes() / 60);
    if (timeInHour <= 12 && timeOutHour <= 12) {
      totalhours = diff.hours() + min;
    }
    else if (timeInHour <= 12 && timeOutHour <= 18) {
      const hour = diff.hours() - 1;
      totalhours = hour + min;
    }
    else if (timeInHour <= 12 && timeOutHour >= 19) {
      const hour = diff.hours() - 2;
      totalhours = hour + min;
    }
    else if (timeInHour >= 13 && timeOutHour <= 18) {
      totalhours = diff.hours() + min;
    }
    else if (timeInHour >= 13 && timeOutHour >= 19) {
      const hour = diff.hours() - 1;
      totalhours = hour + min;
    }
    else if (timeInHour >= 19 && timeOutHour >= 19) {
      totalhours = diff.hours() + min;
    }
    resolve(totalhours);
  }
  catch (error) {
    reject(error);
  }
});

const isHoliday = (holidays, date) => {
  for (let i = 0; i < holidays.length; i += 1) {
    if (moment(holidays[i].date).format('YYYY-MM-DD') === date) {
      return true;
    }
  }
  return false;
};

const createLeaveRequest = (newLeaveRequest, holidays, id) => new Promise(async (resolve, reject) => {
  try {
    const code = hash(`${newLeaveRequest.userId}-${moment()}`);
    for (let m = moment(newLeaveRequest.leaveFrom); m.diff(newLeaveRequest.leaveTo, 'days') <= 0; m.add(1, 'days')) {
      if (m.isoWeekday() !== 6 && m.isoWeekday() !== 7) {
        if (!isHoliday(holidays, m.format('YYYY-MM-DD'))) {
          const totalhours = await calTotalHours(newLeaveRequest.startTime, newLeaveRequest.endTime);
          newLeaveRequest.code = code;
          newLeaveRequest.leaveDate = m.format('YYYY-MM-DD');
          newLeaveRequest.totalhours = totalhours;
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

const countLeaveHours = (newLeaveRequest, holidays) => new Promise(async (resolve, reject) => {
  try {
    let newLeaveHours = 0;
    for (let m = moment(newLeaveRequest.leaveFrom); m.diff(newLeaveRequest.leaveTo, 'days') <= 0; m.add(1, 'days')) {
      if (m.isoWeekday() !== 6 && m.isoWeekday() !== 7) {
        if (!isHoliday(holidays, m.format('YYYY-MM-DD'))) {
          const totalhours = await calTotalHours(newLeaveRequest.startTime, newLeaveRequest.endTime);
          newLeaveHours += totalhours;
        }
      }
    }
    resolve(newLeaveHours);
  }
  catch (error) {
    reject(error);
  }
});

const checkLeaveUsedDate = (newLeaveRequest, holidays) => new Promise(async (resolve, reject) => {
  try {
    let check = true;
    const leaves = await LeaveRequest.findLeaveDate(moment(newLeaveRequest.leaveFrom).format('YYYY'), moment(newLeaveRequest.leaveFrom).format('MM'), newLeaveRequest.userId);
    for (let m = moment(newLeaveRequest.leaveFrom); m.diff(newLeaveRequest.leaveTo, 'days') <= 0; m.add(1, 'days')) {
      if (check === false) {
        break;
      }
      else if (m.isoWeekday() !== 6 && m.isoWeekday() !== 7) {
        if (!isHoliday(holidays, m.format('YYYY-MM-DD'))) {
          for (let i = 0; i < leaves.length; i += 1) {
            if (leaves[i].leaveDate === m.format('YYYY-MM-DD')) {
              check = false;
              console.log('hello');
              break;
            }
          }
        }
      }
    }
    resolve(check);
  }
  catch (error) {
    reject(error);
  }
});

exports.create = async (req, res, next) => {
  const newLeaveRequest = req.body.leaveRequest;
  const holidays = await Holiday.findByYear(moment().format('YYYY'));
  if (req.accessControl.leaveRequestAddAll) {
    // check leave date
    const checkLeaveDate = await checkLeaveUsedDate(newLeaveRequest, holidays);
    console.log(checkLeaveDate);
    if (checkLeaveDate) {
      // check leave remain
      const newLeaveHours = await countLeaveHours(newLeaveRequest, holidays);
      const leaveRemain = await LeaveHistory.findByUserIdAndYear(newLeaveRequest.userId, moment(newLeaveRequest.leaveFrom).format('YYYY'));
      let totalLeaveUsed = 0;
      switch (newLeaveRequest.leaveType) {
        case 'Annual Leave':
          totalLeaveUsed = leaveRemain.annualLeaveRemain;
          break;
        case 'Personal Leave':
          totalLeaveUsed = leaveRemain.personalLeaveRemain;
          break;
        case 'Sick Leave':
          totalLeaveUsed = leaveRemain.sickLeaveRemain;
          break;
        case 'Ordination Leave':
          totalLeaveUsed = leaveRemain.ordinationLeaveRemain;
          break;
        default:
          break;
      }
      if (newLeaveHours <= totalLeaveUsed) {
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
      }
      else {
        const err = new Error('Your remain leave is not enough');
        err.status = 409;
        next(err);
      }
    }
    else {
      const err = new Error('Your leave date is already used  ');
      err.status = 409;
      next(err);
    }
  }
  else if (req.accessControl.leaveRequestAddOwn) {
    if (newLeaveRequest.userId === req.user.id) {
      // check leave date
      const checkLeaveDate = await checkLeaveUsedDate(newLeaveRequest, holidays);
      console.log(checkLeaveDate);
      if (checkLeaveDate) {
      // check leave remain
        const newLeaveHours = await countLeaveHours(newLeaveRequest, holidays);
        const leaveRemain = await LeaveHistory.findByUserIdAndYear(newLeaveRequest.userId, moment(newLeaveRequest.leaveFrom).format('YYYY'));
        let totalLeaveUsed = 0;
        switch (newLeaveRequest.leaveType) {
          case 'Annual Leave':
            totalLeaveUsed = leaveRemain.annualLeaveRemain;
            break;
          case 'Personal Leave':
            totalLeaveUsed = leaveRemain.personalLeaveRemain;
            break;
          case 'Sick Leave':
            totalLeaveUsed = leaveRemain.sickLeaveRemain;
            break;
          case 'Ordination Leave':
            totalLeaveUsed = leaveRemain.ordinationLeaveRemain;
            break;
          default:
            break;
        }
        if (newLeaveHours <= totalLeaveUsed) {
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
        }
        else {
          const err = new Error('Your remain leave is not enough');
          err.status = 409;
          next(err);
        }
      }
      else {
        const err = new Error('Your leave date is already used  ');
        err.status = 409;
        next(err);
      }
    }
    else {
      res.status(401).json({
        message: `You don't have permission to do this.`
      });
    }
  }
};

exports.update = (req, res, next) => {
  const leaveRequestArray = req.body.leaveRequests;
  if (leaveRequestArray[0].status === 'Cancel') {
    if (req.accessControl.leaveRequestCancelOwn && leaveRequestArray[0].userId === req.user.id) {
      Promise.all(leaveRequestArray.map(leaveRequest => LeaveRequest.update(leaveRequest, req.user.id)))
        .then(() => res.json('Update Finish!'))
        .catch(next);
    }
    else {
      res.status(401).json({
        message: `You don't have permission to do this.`
      });
    }
  }
  else if (leaveRequestArray[0].status === 'Approve' || leaveRequestArray[0].status === 'Reject') {
    if (req.accessControl.leaveRequestApprove) {
      Promise.all(leaveRequestArray.map(leaveRequest => LeaveRequest.update(leaveRequest, req.user.id)))
        .then(() => res.json('Update Finish!'))
        .catch(next);
    }
    else {
      res.status(401).json({
        message: `You don't have permission to do this.`
      });
    }
  }
  else {
    res.status(401).json({
      message: `You don't have permission to do this.`
    });
  }
};

exports.findLeaveRequest = (req, res, next) => {
  if (req.accessControl.leaveRequestViewAll) {
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
    else {
      LeaveRequest.findAll()
        .then((leaveRequests) => {
          res.json(leaveRequests);
        })
        .catch(next);
    }
  }
  else if (req.accessControl.leaveRequestViewOwn) {
    if (req.query.month && req.query.year && req.query.userId) {
      if (parseInt(req.query.userId, 10) === req.user.id) {
        LeaveRequest.findByYearAndMonth(req.query.year, req.query.month, req.query.userId)
          .then((leaveRequests) => {
            res.json(leaveRequests);
          })
          .catch(next);
      }
      else {
        res.status(401).json({
          message: `You don't have permission to do this.`
        });
      }
    }
    else if (req.query.userId) {
      if (parseInt(req.query.userId, 10) === req.user.id) {
        LeaveRequest.findByUserId(req.query.userId)
          .then((leaveRequests) => {
            res.json(leaveRequests);
          })
          .catch(next);
      }
      else {
        res.status(401).json({
          message: `You don't have permission to do this.`
        });
      }
    }
    else {
      res.status(401).json({
        message: `You don't have permission to do this.`
      });
    }
  }
};
